### Movies React Application
----

## TODOS:
----

* [x] Add repo
* [x] Add Components Folder
* [x] Add services
* [x] Add Routers Component
* [x] Add prop types
* [x] Add eslint
* [x] Add favicon
* [x] Add react flip move for animation
* [X] Add rows for fetch movies && tv shows
* [X] Fetch data from server
* [x] Add Router
* [X] Display movies
* [x] Display Tv Shows
* [x] Add header
* [x] Add footer
* [x] Check responsive
* [x] Display error if fetching data failed
* [x] Display loading
* [x] Add axios
* [x] Add bootstrap
* [x] Add image loading
* [ ] Add Page Not Found 404!
* [x] Create services for movies and tv shows
* [x] Deleted selected option
* [x] Add logic to each component
* [x] Rename tv shows from inedx to TvShowsPageComponent
* [x] Add MoviesPageComponent
* [x] Remove Routers and add Routers in App Component
* [x] Add array generate all routes without Page Not Found
* [x] active class
* [x] Modified fetching functions by this {response, error}
* [x] Modify Main Layout 
* [x] Filter by /results?sort_by=release_date.desc
    * https://developers.themoviedb.org/3/discover/movie-discover
* [x] Keep filter query in cache (use local storage)
* [x] Displat sort router in UI
* [x] Filter by: Language, certification_country, primary_release_year
    * https://api.themoviedb.org/3/discover/movie?api_key=27a06a6fe752225bcecc30870f193be2&page=3&sort_by=release_date.desc&primary_release_year=2000&certification_country=us
* [x] Solid principals
* [x] Add query
* [x] Remove query
* [x] Remove local storage
* [x] Replace history.replace by history.push
* [x] Add one function handle filters
* [x] Test url in other browser
* ref: https://stackoverflow.com/questions/40161516/how-do-you-programmatically-update-query-params-in-react-router
* Question 3: I don't know if i need removeQuery function
* [x] Add pagination
    * [x] Page return to 1 after reload page
    * [x] Total results return to default
    * [x] Design pagination component
----

* [x] remove fetch data from MoviesPage and tvShows
* [x] remove addQuery from MoviesPage and TvShowsPage
* [x] Add default page on Pagination Component

----
* [x] Make filter take paramater and know what should to return 
    * If filter name not equal to language, thene set page to 1.
* [x] Rename addQuery to setQueryToUrl
* [x] Keep filter instance
* [x] Create Sorting Component and Filter Component
* [x] Add reality source
* [ ] add useEffect in Filter component
* [x] Add loading when user create an action to server
* [x] Refactorin Movies and TvShows Pages
* [x] Catch queries not found errors

----
* [x] Install firebase
* [x] Setup firebase
* [ ] Upload files best practices
* [ ] Create firestore
* [x] Add CreateElementPage Component
    * [x] image
    * [x] type
    * [x] name
    * [x] year
* [x] Add CreateElementPage path
* [x] Add react-form-hooks
* [x] Validate forms
* [x] Setup storage on firebase
* [x] Setup rules on firebase storage
* [x] Store image as file
* [x] Get image as url
* [x] Create CreateElementForm Component
* [ ] reset forms
* [ ] show popup (element created!)
* [x] Create UploadImage Component
* [x] Sperate upload function logic to other function
* [ ] Add loading when create element is upload to server
* [ ] Handle image size (best practices)
* [ ] Style button
* [ ] Add new elements on top of the page in firestore based on type (movies or tvShows)
* [ ] Add some styles to forms if required
* [ ] Make label more clear 
* [ ] Make error red color
* [ ] Refactor create element page
* [ ] Check warnnings
* [ ] Add Error component

## API's
----

* https://api.themoviedb.org/3
* https://api.themoviedb.org/3/discover/movie?api_key=27a06a6fe752225bcecc30870f193be2