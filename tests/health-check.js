'use strict';

const chai = require('chai'),
      chaiExec = require("@jsdevtools/chai-exec"), // Allows us to assert CLI commands
      assert = chai.assert,
      expect = chai.expect;
const fs = require('fs'), // Node file system
      { exec } = require("child_process"); // Node exec function that allows us to run other commands

// Register @jsdevtools/chai-exec
chai.use(chaiExec);

/* Returns true or false depending if a directory exists or not */
function checkDirectoryExists(directory) {
  try {
    if (fs.existsSync(directory)) {
      return true
    }
  } catch(err) {
    return false
  }
}

/* Alias for checkDirectoryExists() so that code is more readable */
function checkFileExists(file) {
  return checkDirectoryExists(file)
}

/* Returns true if a file contains string */
function fileContains(file, text) {
  try {
    const data = fs.readFileSync(file, {encoding: 'utf8'})
    if(data.includes(text)) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}


describe('Health check: General theme structure', function () {
  describe('Directory structure', function () {
    it('./assets', function(done) {
      assert(checkDirectoryExists('./assets'))
      done()
    });
    it('./assets/css', function(done) {
      assert(checkDirectoryExists('./assets/css'))
      done()
    });
    it('./assets/js', function(done) {
      assert(checkDirectoryExists('./assets/js'))
      done()
    });
    it('./templates', function(done) {
      assert(checkDirectoryExists('./templates'))
      done()
    });
  });

  describe('Checking compiled files exist', function () {
    it('./assets/css/lib/style.css', function(done) {
      assert(checkFileExists('./assets/css/lib/main.css'))
      done()
    });
    it('./assets/js/main.js', function(done) {
      assert(checkFileExists('./assets/js/main.js'))
      done()
    });
  });

  describe('Verifying source control and metadata', function () {
    it('.gitignore exists', function(done) {
      assert(checkFileExists('./.gitignore'))
      done()
    });
    it('node_modules/ is gitignored', function(done) {
      assert(fileContains('./.gitignore', 'node_modules'));
      done()
    });
    it('composer.json', function(done) {
      assert(checkFileExists('./composer.json'))
      done()
    });
    it('LICENSE', function(done) {
      assert(checkFileExists('./LICENSE'))
      done()
    });
    it('package.json', function(done) {
      assert(checkFileExists('./package.json'))
      done()
    });
    it('README.md', function(done) {
      assert(checkFileExists('./README.md'))
      done()
    });
  });

  describe('Verifying Drupal files', function () {
    it('breakpoints.yml', function(done) {
      assert(checkFileExists('./localgov_theme.breakpoints.yml'))
      done()
    });
    it('info.yml', function(done) {
      assert(checkFileExists('./localgov_theme.info.yml'))
      done()
    });
    it('libraries.yml', function(done) {
      assert(checkFileExists('./localgov_theme.libraries.yml'))
      done()
    });
    it('theme PHP file', function(done) {
      assert(checkFileExists('./localgov_theme.theme'))
      done()
    });
  });

  describe('Making sure config files exist', function () {
    it('.stylelintrc', function(done) {
      assert(checkFileExists('./.stylelintrc'))
      done()
    });
  });
});


describe('Health check: Gulp tasks', function () {
  describe('Testing NPM commands ', function () {
    it('\'npm run generate\'', function(done) {
      this.timeout(15000);
      let npm = chaiExec('npm run generate');

      expect(npm).to.have.output.that.contains('Finished \'generateStyle\'');
      assert.exitCode(npm, 0);
      done()
    });
  });
});
