import App from "./App";

//launch app on env port
App.listen(process.env.PORT, () => {
    console.log('Express server listening on port ' + process.env.PORT );
})