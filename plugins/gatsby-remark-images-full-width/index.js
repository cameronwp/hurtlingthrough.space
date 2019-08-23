'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var select = require('unist-util-select');
var path = require('path');
var isRelativeUrl = require('is-relative-url');
var _ = require('lodash');

var _require = require('gatsby-plugin-sharp'),
    sizes = _require.sizes;

var Promise = require('bluebird');
var cheerio = require('cheerio');
var slash = require('slash');
var regeneratorRuntime = require('regenerator-runtime/runtime');

// If the image is relative (not hosted elsewhere)
// 1. Find the image file
// 2. Find the image's size
// 3. Filter out any responsive image sizes that are greater than the image's width
// 4. Create the responsive images.
// 5. Set the html w/ aspect ratio helper.
module.exports = function (_ref, pluginOptions) {
  var files = _ref.files,
      markdownNode = _ref.markdownNode,
      markdownAST = _ref.markdownAST,
      pathPrefix = _ref.pathPrefix,
      getNode = _ref.getNode;

  // This will only work for markdown syntax image tags
  var markdownImageNodes = select(markdownAST, 'image');

  // This will also allow the use of html image tags
  var rawHtmlNodes = select(markdownAST, 'html');

  // Takes a node and generates the needed images and then returns
  // the needed HTML replacement for the image
  var generateImagesAndUpdateNode = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(node, resolve) {
      var defaults, options, parentNode, imagePath, imageNode, fwToken, isFullWidth, nlToken, isNoLink, responsiveSizesResult, ratio, originalImg, fallbackSrc, srcSet, presentationWidth, srcSplit, fileName, fileNameNoExt, defaultAlt, rawHTML;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              defaults = {
                maxWidth: 650,
                wrapperStyle: '',
                backgroundColor: 'white',
                linkImagesToOriginal: true,
                pathPrefix: pathPrefix
              };
              options = _.assign({}, pluginOptions, defaults);

              // Check if this markdownNode has a File parent. This plugin
              // won't work if the image isn't hosted locally.

              parentNode = getNode(markdownNode.parent);
              imagePath = void 0;

              if (!(parentNode && parentNode.dir)) {
                _context.next = 8;
                break;
              }

              imagePath = slash(path.join(parentNode.dir, node.url));
              _context.next = 9;
              break;

            case 8:
              return _context.abrupt('return', null);

            case 9:
              imageNode = _.find(files, function (file) {
                if (file && file.absolutePath) {
                  return file.absolutePath === imagePath;
                }
                return null;
              });

              if (!(!imageNode || !imageNode.absolutePath)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', resolve());

            case 12:
              fwToken = '<-FULLWIDTH->';
              isFullWidth = _.startsWith(node.alt, fwToken);
              nlToken = '<-NOLINK->';
              isNoLink = _.startsWith(node.alt, nlToken);


              if (isFullWidth) {
                node.alt = node.alt.slice(fwToken.length); // get rid of the token
                options.maxWidth = 3840; // up to 4K images
              }

              if (isNoLink) {
                node.alt = node.alt.slice(nlToken.length);
              }

              if (isFullWidth || isNoLink) {
                options.linkImagesToOriginal = false;
              }

              _context.next = 21;
              return sizes({
                file: imageNode,
                args: options
              });

            case 21:
              responsiveSizesResult = _context.sent;


              // Calculate the paddingBottom %
              ratio = 1 / responsiveSizesResult.aspectRatio * 100 + '%';
              originalImg = responsiveSizesResult.originalImg;
              fallbackSrc = responsiveSizesResult.src;
              srcSet = responsiveSizesResult.srcSet;
              presentationWidth = responsiveSizesResult.presentationWidth;

              // Generate default alt tag

              srcSplit = node.url.split('/');
              fileName = srcSplit[srcSplit.length - 1];
              fileNameNoExt = fileName.replace(/\.[^/.]+$/, '');
              defaultAlt = fileNameNoExt.replace(/[^A-Z0-9]/gi, ' ');

              // TODO
              // Fade in images on load.
              // https://www.perpetual-beta.org/weblog/silky-smooth-image-loading.html

              // Construct new image node w/ aspect ratio placeholder

              rawHTML = '\n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ' + options.wrapperStyle + '; ' + (isFullWidth ? 'width: 100vw; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw;' : 'max-width: ' + presentationWidth + 'px; margin-left: auto; margin-right: auto;') + '"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: ' + ratio + '; position: relative; bottom: 0; left: 0; background-image: url(\'' + responsiveSizesResult.base64 + '\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px ' + options.backgroundColor + ';"\n        alt="' + (node.alt ? node.alt : defaultAlt) + '"\n        title="' + (node.title ? node.title : '') + '"\n        src="' + fallbackSrc + '"\n        srcset="' + srcSet + '"\n        sizes="' + responsiveSizesResult.sizes + '"\n      />\n    </span>\n  </span>\n  ';

              // Make linking to original image optional.

              if (options.linkImagesToOriginal) {
                rawHTML = '\n  <a\n    class="gatsby-resp-image-link"\n    href="' + originalImg + '"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  ' + rawHTML + '\n  </a>\n    ';
              }

              return _context.abrupt('return', rawHTML);

            case 34:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function generateImagesAndUpdateNode(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  return Promise.all(
  // Simple because there is no nesting in markdown
  markdownImageNodes.map(function (node) {
    return new Promise(function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
        var fileType, rawHTML;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fileType = node.url.slice(-3);

                // Ignore gifs as we can't process them,
                // svgs as they are already responsive by definition

                if (!(isRelativeUrl(node.url) && fileType !== 'gif' && fileType !== 'svg')) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 4;
                return generateImagesAndUpdateNode(node, resolve);

              case 4:
                rawHTML = _context2.sent;

                // Replace the image node with an inline HTML node.
                node.type = 'html';
                node.value = rawHTML;
                return _context2.abrupt('return', resolve(node));

              case 10:
                return _context2.abrupt('return', resolve());

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }());
  })).then(function (markdownImageNodes) {
    return (
      // HTML image node stuff
      Promise.all(
      // Complex because HTML nodes can contain multiple images
      rawHtmlNodes.map(function (node) {
        return new Promise(function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
            var $, imageRefs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, thisImg, formattedImgTag, fileType, rawHTML;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (node.value) {
                      _context3.next = 2;
                      break;
                    }

                    return _context3.abrupt('return', resolve());

                  case 2:
                    $ = cheerio.load(node.value);

                    if (!($('img').length === 0)) {
                      _context3.next = 5;
                      break;
                    }

                    return _context3.abrupt('return', resolve());

                  case 5:
                    imageRefs = [];

                    $('img').each(function () {
                      imageRefs.push($(this));
                    });

                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context3.prev = 10;
                    _iterator = imageRefs[Symbol.iterator]();

                  case 12:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context3.next = 32;
                      break;
                    }

                    thisImg = _step.value;

                    // Get the details we need.
                    formattedImgTag = {};

                    formattedImgTag.url = thisImg.attr('src');
                    formattedImgTag.title = thisImg.attr('title');
                    formattedImgTag.alt = thisImg.attr('alt');

                    if (formattedImgTag.url) {
                      _context3.next = 20;
                      break;
                    }

                    return _context3.abrupt('return', resolve());

                  case 20:
                    fileType = formattedImgTag.url.slice(-3);

                    // Ignore gifs as we can't process them,
                    // svgs as they are already responsive by definition

                    if (!(isRelativeUrl(formattedImgTag.url) && fileType !== 'gif' && fileType !== 'svg')) {
                      _context3.next = 28;
                      break;
                    }

                    _context3.next = 24;
                    return generateImagesAndUpdateNode(formattedImgTag, resolve);

                  case 24:
                    rawHTML = _context3.sent;

                    // Replace the image string
                    thisImg.replaceWith(rawHTML);
                    _context3.next = 29;
                    break;

                  case 28:
                    return _context3.abrupt('return', resolve());

                  case 29:
                    _iteratorNormalCompletion = true;
                    _context3.next = 12;
                    break;

                  case 32:
                    _context3.next = 38;
                    break;

                  case 34:
                    _context3.prev = 34;
                    _context3.t0 = _context3['catch'](10);
                    _didIteratorError = true;
                    _iteratorError = _context3.t0;

                  case 38:
                    _context3.prev = 38;
                    _context3.prev = 39;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                      _iterator.return();
                    }

                  case 41:
                    _context3.prev = 41;

                    if (!_didIteratorError) {
                      _context3.next = 44;
                      break;
                    }

                    throw _iteratorError;

                  case 44:
                    return _context3.finish(41);

                  case 45:
                    return _context3.finish(38);

                  case 46:

                    // Replace the image node with an inline HTML node.
                    node.type = 'html';
                    node.value = $('body').html(); // fix for cheerio v1

                    return _context3.abrupt('return', resolve(node));

                  case 49:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, undefined, [[10, 34, 38, 46], [39,, 41, 45]]);
          }));

          return function (_x5, _x6) {
            return _ref4.apply(this, arguments);
          };
        }());
      })).then(function (htmlImageNodes) {
        return markdownImageNodes.concat(htmlImageNodes).filter(function (node) {
          return !!node;
        });
      })
    );
  });
};