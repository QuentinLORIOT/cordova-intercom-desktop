<<<<<<< HEAD
module.exports = function() {
  var q = require('q');
  var exec = require('child_process').exec;

  var deferral = new q.defer();
=======
module.exports = function(context) {
  var Q = context.require('q');
  var deferral = new Q.defer();
  var exec = context.require('child_process').exec;
>>>>>>> Fixing builds
  
  console.log('Updating CocoaPods specs repo');
  exec('pod repo update master', function(error, stdout, stderr) {
    deferral.resolve();
  });

  return deferral.promise;
}
