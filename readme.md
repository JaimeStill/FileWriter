# File Write - PowerShell SDK with Web API and Angular

This repository is a simple demonstration of how to use a PowerShell script embedded in a .NET Core class library, exposing the functionality of the script to a Web API / Angular web app. This application has been kept very simple to emphasize how data flows and executes between each technology.

[![write-file](images/01-write-file.gif)](images/01-write-file.gif)  
*click to open*  

All of the PowerShell-related features are contained in the [src/FileWriter.Scripting](src/FileWriter.Scripting) library. It uses the [Microsoft.PowerShell.SDK](https://www.nuget.org/packages/Microsoft.PowerShell.SDK/) to execute an embedded `.ps1` script in a PowerShell Core runspace on the machine that is hosting the .NET Core app.

[FileWriter.Scripting/Scripts/Write-Text.ps1](src/FileWriter.Scripting/Scripts/Write-Text.ps1)

[![write-text.ps1](images/02-write-text.ps1.png)](images/02-write-text.ps1.png)  

This simple script takes a `path` and a `value` parameter to create a text file at the specified path with the specified value.

In order to access the 