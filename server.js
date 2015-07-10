var fs = require('fs')
    , path = require('path')
    , _ = require('underscore')
    , fse = require('fs.extra')
    , futil = require('./fileUtil.js');

var targetPath = "./target/";
var srcPath = "./template2/";
var jsonFile = "./site1.json";

run_cmd("rm", ["-rf", targetPath], function() {});
run_cmd("mkdir", [targetPath], function() {});
var siteData = createSiteData(jsonFile);
fse.copyRecursive(srcPath, targetPath, function(err) {
  if (! err) {
    futil.transform(siteData, srcPath, targetPath);
    futil.createStaticFiles(siteData, targetPath + "www/contents/templates/", "./contentTemplate/");
  }
});


function createSiteData(jsonFile) {
  var siteData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  var pageMap = {}
  _.each(siteData.pages, function(page) {
    pageMap[page.id] = page;
  })
  siteData.pageMap = pageMap;

  var menuPages = [];
  var shortCutMenus = [];
  _.each(siteData.menus, function(pageId) {
    menuPages.push(pageMap[pageId]);
    shortCutMenus.push(pageMap[pageId]);
  });
  if (shortCutMenus.length < 6) {
    for (var i = 0; i < 6 - shortCutMenus.length; i++) {
      shortCutMenus.push({
        id: 1,
        title: '',
        body: ''
      })
    }
  }


  siteData['menuPages'] = menuPages;
  siteData['shortCutMenus'] = shortCutMenus;

  return siteData;
}

function run_cmd(cmd, args, callBack ) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on('data', function (buffer) { resp += buffer.toString() });
  child.stdout.on('end', function() { callBack (resp) });
}








