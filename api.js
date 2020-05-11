var Router = require('koa-router');

const team = new Router({
    prefix: '/api/v1'
});
const project = new Router();

const tasks = new Router();



var taskList = [
    {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
    {id: 102, name: "Inception", year: 2010, rating: 8.7},
    {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
    {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
 ];
 
 //Routes will go here
 tasks.get('/task', (ctx, next) => {
     ctx.body = 'tasks';
     next();
 });

 tasks.get('/task/:tid', (ctx, next) => {
     ctx.body = taskList.filter(function(movie) {
         if(movie.id == ctx.params.pid) return true;
         else ctx.throw(404)
     })
     next();
 });


 project.use('/project/:pid', tasks.routes(), tasks.allowedMethods())

 project.get('/project', (ctx, next) => {
     ctx.body = "project";
     next();
 });
 

team.use('/team/:tid', project.routes(), project.allowedMethods())

team.get('/team', (ctx, next) => {
    ctx.body = "heello";
    next();
})


module.exports = team;