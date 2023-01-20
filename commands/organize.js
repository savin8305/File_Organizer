let fs = require("fs");
let path = require("path");
let chalk=require("chalk");
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
function organizefn(dirPath) {
 
    console.log(chalk.bgBlueBright.inverse('File Are Now ! Organizing '));
    console.log(chalk.yellow('Welcome to the app!'));
    let destPath;
    if (dirPath == undefined) {
        destPath = process.cwd();
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {

            // 2. create -> organized_files -> directory
            destPath = path.join(dirPath, "organized_files");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }
            console.log(chalk.redBright.inverse(`            Your                                                     .
            task                                                 .
                 is in                                       .
                        progress                                    .`));

        } else {

            console.log(chalk.redBright.inverse(`            Enter                                                     .
                  the                                                 .
                       correct                                        .
                              path                                    .`));
            return;
        }
    }
    organizeHelper(dirPath, destPath);
    // 3. identify categories of all the files present in that input directory  ->
}
function organizeHelper(src, dest) {
    // 3. identify categories of all the files present in that input directory  ->
    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(chalk.green(childNames[i], "belongs to --> ", category));
            // 4. copy / cut  files to that organized directory inside of any of category folder 
            sendFiles(childAddress, dest, category);
        }
    }
}
function sendFiles(srcFilePath, dest, category) {
    // 
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(chalk.blue(fileName, "copied to ", category));

}
function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}
console.log(chalk.redBright.inverse(`            Your                                                     .
task                                                 .
     is                                        .
            finished ! 
                        thanks ! :)                                    .`));
module.exports={
    organizekey:organizefn
}
