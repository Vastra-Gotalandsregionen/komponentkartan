#addin "Cake.MsDeploy"
#addin "Cake.XdtTransform"
#addin "Cake.Npm"
#addin "Cake.Powershell"

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");
var environment = Argument("environment", "Local");

var buildOutputWeb = Directory("./BuildOutput/");
var garbageDir = Directory("./garbageDir/");

var buildBinWeb = Directory("./bin");
var buildObjWeb = Directory("./obj");

var javascriptTestFolder = Directory("./Tests");
var deployServer = string.Empty;

Task("Validate-Arguments")
	.Does(() =>
{
	switch(configuration)
	{
		case "Debug":
			break;
		case "Release":
			break;
		default:
			throw new Exception(string.Format(
				"{0} is not a valid configuration. Valid configurations are: Debug, Release.",
				configuration));
	}

	switch(environment)
	{
		case "Local":
			break;
		case "Test":
			deployServer = "vgwb0399";
			break;
		case "Demo":
			deployServer = "vgwb0399";
			break;
		default:
			throw new Exception(string.Format(
				"{0} is not a valid environment. Valid environments are: Local, Test, Demo.",
				environment));
	}

	Verbose("Configuration: {0}", configuration);
	Verbose("Environment: {0}", environment);
});

Task("PrebuildActions")
	.IsDependentOn("Restore-NpmPackages")
	.Does(() =>
{
	if (!DirectoryExists(garbageDir)) {
		CreateDirectory(garbageDir);
	}

    Information("Flytta js filer för borttagning");
	MoveFiles("./demo-app/**/*.js", garbageDir);
	MoveFiles("./demo-app/**/*.js.map", garbageDir);
    MoveFiles("./component-package/**/*.js", garbageDir);
	MoveFiles("./component-package/**/*.js.map", garbageDir);

	Information("Ta bort css:er");
	DeleteFiles("./Content/*.css");
	DeleteFiles("./demo-app/Content*.css");

	CleanDirectories(new DirectoryPath[]
    {

        buildBinWeb,buildObjWeb,garbageDir
    });

	//Kör rimraf eftersom vi har långa sökvägar
	//OBS! Rimraf kräver att vi har installerat NPM, eftersom det körs via npm run

	NpmRunScript(new NpmRunScriptSettings
    {
        ScriptName = "_clean_build_output",
        WorkingDirectory = "./"
    });


    //Sätter upp strukturen
    if (!DirectoryExists(buildOutputWeb)) {
		CreateDirectory(buildOutputWeb);
	}
    if (!DirectoryExists("./BuildOutput/demo-app")) {
        CreateDirectory("./BuildOutput/demo-app");
	}
	if (!DirectoryExists("./BuildOutput/demo-app/content")) {
        CreateDirectory("./BuildOutput/demo-app/content");
	}
    if (!DirectoryExists("./BuildOutput/component-package")) {
        CreateDirectory("./BuildOutput/component-package");
	}
    if (!DirectoryExists("./BuildOutput/scripts")) {
	    CreateDirectory("./BuildOutput/scripts");
	}
    if (!DirectoryExists("./BuildOutput/content")) {
	    CreateDirectory("./BuildOutput/content");
	}
    if (!DirectoryExists("./BuildOutput/tests")) {
	    CreateDirectory("./BuildOutput/tests");
	}
    if (!DirectoryExists("./BuildOutput/Images")) {
	    CreateDirectory("./BuildOutput/Images");
	}
    if (!DirectoryExists("./BuildOutput/fonts")) {
	    CreateDirectory("./BuildOutput/fonts");
	}
});


Task("Restore-NpmPackages")
   .Does(() =>
	{
		NpmInstall(new NpmInstallSettings
    	{
        	WorkingDirectory = "./",
			Production = false
    	});
	});

Task("Build-Npm-Frontend-Packages")
	.Does(()=>{
		CopyFile("./package.json","./BuildOutput/package.json");
		NpmInstall(new NpmInstallSettings
    	{
        	WorkingDirectory = "./BuildOutput/",
			Production = true
    	});
		DeleteFile("./BuildOutput/package.json");
	});


Task("Build-TypescriptAndSass")
.IsDependentOn("Restore-NpmPackages")
.Does(() =>
{
	NpmRunScript(new NpmRunScriptSettings
    {
        ScriptName = "_compile-ts",
        WorkingDirectory = "./"
    });
	NpmRunScript(new NpmRunScriptSettings
    {
        ScriptName = "_compile-css",
        WorkingDirectory = "./"
    });
	NpmRunScript(new NpmRunScriptSettings
    {
        ScriptName = "_compile-demo-app-css",
        WorkingDirectory = "./"
    });
});


Task("Run-Jasmine-Tests")
.IsDependentOn("Build-TypescriptAndSass")
.Does(() =>
{
	NpmRunScript(new NpmRunScriptSettings
    {
        ScriptName = "test-ci",
        WorkingDirectory = "./"
    });
});

Task("Move-TypescriptAndSass")
.IsDependentOn("Build-TypescriptAndSass")
.Does(() => {
        //Kopiera *.js filer
		CopyFiles("./demo-app/**/*.js", "./BuildOutput/demo-app", true);
		CopyFiles("./component-package/**/*.js", "./BuildOutput/component-package", true);
		CopyFiles("./scripts/*.js", "./BuildOutput/scripts", true);
		CopyFiles("./tests/*.js", "./BuildOutput/tests", true);

        //Kopiera *.css
		CopyFiles("./content/*.css", "./BuildOutput/content", true);
		CopyFiles("./demo-app/content/*.css", "./BuildOutput/demo-app/content", true);
});

Task("Build-Frontend")
	.IsDependentOn("Build-TypescriptAndSass")
	.IsDependentOn("Move-TypescriptAndSass")
	.IsDependentOn("Build-Npm-Frontend-Packages")
	.IsDependentOn("Run-Jasmine-Tests")
	.Does(() => {
        CopyFiles("./component-package/**/*.*", "./BuildOutput/component-package", true);
        CopyFiles("./demo-app/**/*.*", "./BuildOutput/demo-app", true);
        CopyFiles("./tests/**/*.*", "./BuildOutput/tests", true);
        CopyFiles("./Images/*.*", "./BuildOutput/Images", true);
        CopyFiles("./index.html", "./BuildOutput/", true);
        CopyFiles("./systemjs.config.js", "./BuildOutput/", true);
        CopyFiles("./BuildOutput/node_modules/font-awesome/fonts/*.*", "./BuildOutput/fonts/", true);
    });

Task("Deploy-Frontend")
	.IsDependentOn("Validate-Arguments")
	.WithCriteria(() => environment != "Local")
	.IsDependentOn("PrebuildActions")
	.IsDependentOn("Build-Frontend")
	.Does(() =>
{

	var sourcePath =  MakeAbsolute(Directory("./BuildOutput/")).FullPath;
	var destinationPath = environment + "-komponentkartan";


		MsDeploy(new MsDeploySettings
	{
		Verb = Operation.Sync,
		AllowUntrusted = true,
		Source = new IisAppProvider
		{
			Direction = Direction.source,
			Path = sourcePath
		},
		Destination = new IisAppProvider
		{
			Direction = Direction.dest,
			Path = destinationPath,
			WebManagementService = deployServer,
			Username = "deploy",
			Password = "Spring2017!"
		}
	});
});




Task("Default")
	.IsDependentOn("Deploy-Frontend");

RunTarget(target);