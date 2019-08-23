# CommandLine
- cd 'E:\projects\github repos'

- mkdir reactivities-net

- cd .\reactivities-net
- dotnet new sln -n Reactivities

- mkdir src

- cd .\src
- dotnet new classlib -n Domain
- dotnet new classlib -n Application
- dotnet new classlib -n Persistence
- dotnet new webapi -n API
- cd ../
- dotnet sln add .\src\Domain
- dotnet sln add .\src\Application
- dotnet sln add .\src\Persistence
- dotnet sln add .\src\API
- dotnet sln list
- cd .\src\Application
- dotnet add reference ..\Domain\
- dotnet add reference ..\Persistence\
- cd ../API
- dotnet add reference ..\Application\
- cd ..\Persistence
- dotnet add reference ..\Domain\
- cd ../../
- git init
- code .
- dotnet run --project .\src\API
- dotnet ef migrations add InitialCreate -p ./src/Persistence -s ./src/API
- dotnet ef database update
- cd ./src/API
- dotnet watch run (only works in context of startup project)

# Packages Added

- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.Sqlite

# Useful Git Commands

## Prune stale remote branched

```
    git remote prune origin --dry-run
    git remote prune origin
```

## Prune when you fetch from remote
```
 git fetch --prune 
 ```

 ## Prune local branches which have been merged
 ```
  git branch --merged
  ```

  ### To delete a branch 
  ```
    git branch -d branch-to-delete
  ```

## Prune local branches which have not been merged
```
    git branch --no-merged
```

### To delete the branch 
```
git branch -D un-merged-branch-to-delete
```


# Creating the react application 
```
npx create-react-app client-app --use-npm --typescript
```
