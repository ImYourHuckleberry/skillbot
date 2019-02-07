const noteRoutes = require('./note_routes');
const intermediateRoutes = require('./intermediate_routes')
module.exports = function(app, db) {
    
  noteRoutes(app, db);
  intermediateRoutes(app,db)
  // Other route groups could go here, in the future
};