#addin "Cake.MsDeploy"
#addin "Cake.Npm"
#addin "Cake.Powershell"

var target = Argument("target", "Default");
var environment = Argument("environment", "Local");
var deployServer = string.Empty;

Task("Validate-Arguments")
	.Does(() =>
{
	switch(environment)
	{
		case "Local":
			break;
		case "Test":
			break;
		case "Demo":
			break;
		default:
			throw new Exception(string.Format(
				"{0} is not a valid environment. Valid environments are: Local, Test, Demo.",
				environment));
	}

	
	Verbose("Environment: {0}", environment);
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

Task("Run-Jasmine-Tests")
.IsDependentOn("Build-Frontend")
.Does(() =>
{
	NpmRunScript(new NpmRunScriptSettings
    {
        ScriptName = "test-ci",
        WorkingDirectory = "./",
    });
});

Task("Build-Frontend")
	 .IsDependentOn("Restore-NpmPackages")
	.Does(() => {
      NpmRunScript(new NpmRunScriptSettings
    {
        ScriptName = "build",
        WorkingDirectory = "./"
    });

});

RunTarget(target);