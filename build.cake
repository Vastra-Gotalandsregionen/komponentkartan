#addin "Cake.MsDeploy"
#addin "Cake.XdtTransform"
#addin "Cake.Npm"
#addin "Cake.Powershell"

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");
var environment = Argument("environment", "Local");

var buildOutputWeb = Directory("./Komponentkartan/BuildOutput/");
var garbageDir = Directory("./Komponentkartan/garbageDir/");

var buildBinWeb = Directory("./Komponentkartan/bin");
var buildObjWeb = Directory("./Komponentkartan/obj");

var javascriptTestFolder = Directory("./Komponentkartan/Tests");
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

Task("CleanStagingFolders")
	.IsDependentOn("Restore-NpmPackages")
	.Does(() =>
{
	if (!DirectoryExists(garbageDir)) {
		CreateDirectory(garbageDir);
	}

	Information("Flytta js filer för borttagning");
	MoveFiles("./Komponentkartan/app/**/*.js", garbageDir);
	MoveFiles("./Komponentkartan/app/**/*.js.map", garbageDir);

	Information("Ta bort css:er");
	DeleteFiles("./Komponentkartan/Content/*.css");

	CleanDirectories(new DirectoryPath[]
    {

        buildBinWeb,buildObjWeb,garbageDir
    });

	//Kör rimraf eftersom vi har långa sökvägar
	//OBS! Rimraf kräver att vi har installerat NPM, eftersom det körs via npm run

	NpmRunScript(new NpmRunScriptSettings
    {
        ScriptName = "_clean_build_output",
        WorkingDirectory = "./Komponentkartan"
    });
});


Task("Restore-NpmPackages")
   .Does(() =>
	{
		NpmInstall(new NpmInstallSettings
    	{
        	WorkingDirectory = "./Komponentkartan",
			Production = false
    	});
	});

Task("Build-Npm-Frontend-Packages")
	.Does(()=>{
		CopyFile("./Komponentkartan/package.json","./Komponentkartan/BuildOutput/_PublishedWebsites/Komponentkartan/package.json");
		NpmInstall(new NpmInstallSettings
    	{
        	WorkingDirectory = "./Komponentkartan/BuildOutput/_PublishedWebsites/Komponentkartan/",
			Production = true
    	});
		DeleteFile("./Komponentkartan/BuildOutput/_PublishedWebsites/Komponentkartan/package.json");
	});


Task("Build-TypescriptAndSass")
.IsDependentOn("Restore-NpmPackages")
.Does(() =>
{
	NpmRunScript(new NpmRunScriptSettings
    {
        ScriptName = "_compile-typescript",
        WorkingDirectory = "./Komponentkartan"
    });
	NpmRunScript(new NpmRunScriptSettings
    {
        ScriptName = "_compile-css",
        WorkingDirectory = "./Komponentkartan"
    });
});



Task("Move-TypescriptAndSass")
.IsDependentOn("Build-TypescriptAndSass")
.Does(() => {
		//Kopiera *,js filer
		CopyFiles("./Komponentkartan/app/**/*.js", "./Komponentkartan/BuildOutput/_PublishedWebsites/Komponentkartan/app", true);
		CopyFiles("./Komponentkartan/scripts/*.js", "./Komponentkartan/BuildOutput/_PublishedWebsites/Komponentkartan/scripts", true);

		//Kopiera *.css
		CopyFiles("./Komponentkartan/content/*.css", "./Komponentkartan/BuildOutput/_PublishedWebsites/Komponentkartan/content", true);

});

Task("Build-Frontend")
	.IsDependentOn("Build-TypescriptAndSass")
	.IsDependentOn("Move-TypescriptAndSass")
	.IsDependentOn("Build-Npm-Frontend-Packages")
	.Does(() => {});



Task("Deploy-Frontend")
	.IsDependentOn("Validate-Arguments")
	.WithCriteria(() => environment != "Local")
	.IsDependentOn("CleanStagingFolders")
	.IsDependentOn("Build-Frontend")
	.Does(() =>
{

	var sourcePath =  MakeAbsolute(Directory("./Komponentkartan/BuildOutput/_PublishedWebsites/Komponentkartan")).FullPath;
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