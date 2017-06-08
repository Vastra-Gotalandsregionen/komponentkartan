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
	MoveFiles("./app/**/*.js", garbageDir);
	MoveFiles("./app/**/*.js.map", garbageDir);

	Information("Ta bort css:er");
	DeleteFiles("./Content/*.css");

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

    if (!DirectoryExists(buildOutputWeb)) {
		CreateDirectory(buildOutputWeb);
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
        ScriptName = "_compile-typescript",
        WorkingDirectory = "./"
    });
	NpmRunScript(new NpmRunScriptSettings
    {
        ScriptName = "_compile-css",
        WorkingDirectory = "./"
    });
});



Task("Move-TypescriptAndSass")
.IsDependentOn("Build-TypescriptAndSass")
.Does(() => {
        if (!DirectoryExists("./BuildOutput/app")) {
		    CreateDirectory("./BuildOutput/app");
	    }
        if (!DirectoryExists("./BuildOutput/scripts")) {
		    CreateDirectory("./BuildOutput/scripts");
	    }
        if (!DirectoryExists("./BuildOutput/content")) {
		    CreateDirectory("./BuildOutput/content");
	    }

		//Kopiera *,js filer
		CopyFiles("./app/**/*.js", "./BuildOutput/app", true);
		CopyFiles("./scripts/*.js", "./BuildOutput/scripts", true);

		//Kopiera *.css
		CopyFiles("./content/*.css", "./BuildOutput/content", true);
		
        CopyFiles("./index.html", "./BuildOutput/", true);
        CopyFiles("./systemjs.config.js", "./BuildOutput/", true);

});

Task("Build-Frontend")
	.IsDependentOn("Build-TypescriptAndSass")
	.IsDependentOn("Move-TypescriptAndSass")
	.IsDependentOn("Build-Npm-Frontend-Packages")
	.Does(() => {});



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