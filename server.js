var fs = require('fs')
    , path = require('path')
    , _ = require('underscore')
    , futil = require('./fileUtil.js')
    , EJS = require('ejs');

var targetPath = "/Users/pphetra/temp/generator/target/";
var srcPath = "/Users/pphetra/temp/generator/template/";
var jsonFile = "/Users/pphetra/temp/generator/site1.json";

run_cmd("rm", ["-rf", targetPath], function() {});
run_cmd("mkdir", [targetPath], function() {});
var siteData = createSiteData(jsonFile);
futil.copy(siteData, srcPath, targetPath);
futil.createStaticFiles(siteData, targetPath + "www/contents/templates/", "/Users/pphetra/temp/generator/contentTemplate/");


function createSiteData(jsonFile) {
  var siteData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  var pageMap = {}
  _.each(siteData.pages, function(page) {
    pageMap[page.id] = page;
  })
  siteData.pageMap = pageMap;

  menuPages = [];
  _.each(siteData.menus, function(pageId) {
    menuPages.push(pageMap[pageId]);
  });

  siteData['menuPages'] = menuPages;

  return siteData;
}

function run_cmd(cmd, args, callBack ) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on('data', function (buffer) { resp += buffer.toString() });
  child.stdout.on('end', function() { callBack (resp) });
}








