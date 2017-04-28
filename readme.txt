how to deploy ASP.NET Core application:

- use cmder - navigate to folder with both the git and node labels (core2017) (HomeHUD@0.0.0)
- restore nuget, run: 
	dotnet restore
- restore packages, run: 
	npm install
- set environment variable if necessary:
	set ASPNETCORE_ENVIRONMENT=Development
- run: 
	dotnet run
- if faced with error 'Call to Node module failed with error: Error: Cannot find module './wwwroot/dist/vendor-manifest.json', run:
	webpack --config webpack.config.vendor.js
