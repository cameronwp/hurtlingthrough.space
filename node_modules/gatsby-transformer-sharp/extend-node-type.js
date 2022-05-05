"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Promise = require(`bluebird`);

var _require = require(`graphql`),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLInputObjectType = _require.GraphQLInputObjectType,
    GraphQLBoolean = _require.GraphQLBoolean,
    GraphQLString = _require.GraphQLString,
    GraphQLInt = _require.GraphQLInt,
    GraphQLFloat = _require.GraphQLFloat,
    GraphQLEnumType = _require.GraphQLEnumType;

var _require2 = require(`gatsby-plugin-sharp`),
    queueImageResizing = _require2.queueImageResizing,
    base64 = _require2.base64,
    sizes = _require2.sizes,
    resolutions = _require2.resolutions,
    traceSVG = _require2.traceSVG;

var sharp = require(`sharp`);
var fsExtra = require(`fs-extra`);
var sizeOf = require(`image-size`);
var path = require(`path`);
var Potrace = require(`potrace`).Potrace;

var ImageFormatType = new GraphQLEnumType({
  name: `ImageFormat`,
  values: {
    NO_CHANGE: { value: `` },
    JPG: { value: `jpg` },
    PNG: { value: `png` },
    WEBP: { value: `webp` }
  }
});

var ImageCropFocusType = new GraphQLEnumType({
  name: `ImageCropFocus`,
  values: {
    CENTER: { value: sharp.gravity.center },
    NORTH: { value: sharp.gravity.north },
    NORTHEAST: { value: sharp.gravity.northeast },
    EAST: { value: sharp.gravity.east },
    SOUTHEAST: { value: sharp.gravity.southeast },
    SOUTH: { value: sharp.gravity.south },
    SOUTHWEST: { value: sharp.gravity.southwest },
    WEST: { value: sharp.gravity.west },
    NORTHWEST: { value: sharp.gravity.northwest },
    ENTROPY: { value: sharp.strategy.entropy },
    ATTENTION: { value: sharp.strategy.attention }
  }
});

var DuotoneGradientType = new GraphQLInputObjectType({
  name: `DuotoneGradient`,
  fields: function fields() {
    return {
      highlight: { type: GraphQLString },
      shadow: { type: GraphQLString },
      opacity: { type: GraphQLInt }
    };
  }
});

var PotraceType = new GraphQLInputObjectType({
  name: `Potrace`,
  fields: function fields() {
    return {
      turnPolicy: {
        type: new GraphQLEnumType({
          name: `PotraceTurnPolicy`,
          values: {
            TURNPOLICY_BLACK: { value: Potrace.TURNPOLICY_BLACK },
            TURNPOLICY_WHITE: { value: Potrace.TURNPOLICY_WHITE },
            TURNPOLICY_LEFT: { value: Potrace.TURNPOLICY_LEFT },
            TURNPOLICY_RIGHT: { value: Potrace.TURNPOLICY_RIGHT },
            TURNPOLICY_MINORITY: { value: Potrace.TURNPOLICY_MINORITY },
            TURNPOLICY_MAJORITY: { value: Potrace.TURNPOLICY_MAJORITY }
          }
        })
      },
      turdSize: { type: GraphQLFloat },
      alphaMax: { type: GraphQLFloat },
      optCurve: { type: GraphQLBoolean },
      optTolerance: { type: GraphQLFloat },
      threshold: { type: GraphQLInt },
      blackOnWhite: { type: GraphQLBoolean },
      color: { type: GraphQLString },
      background: { type: GraphQLString }
    };
  }
});

module.exports = function (_ref) {
  var type = _ref.type,
      pathPrefix = _ref.pathPrefix,
      getNodeAndSavePathDependency = _ref.getNodeAndSavePathDependency;

  if (type.name !== `ImageSharp`) {
    return {};
  }

  var getTracedSVG = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
      var file = _ref2.file,
          image = _ref2.image,
          fieldArgs = _ref2.fieldArgs;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", traceSVG({
                file,
                args: (0, _extends3.default)({}, fieldArgs.traceSVG),
                fileArgs: fieldArgs
              }));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function getTracedSVG(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    original: {
      type: new GraphQLObjectType({
        name: `ImageSharpOriginal`,
        fields: {
          width: { type: GraphQLFloat },
          height: { type: GraphQLFloat },
          src: { type: GraphQLString }
        }
      }),
      args: {},
      resolve(image, fieldArgs, context) {
        var _this = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var details, dimensions, imageName, publicPath;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  details = getNodeAndSavePathDependency(image.parent, context.path);
                  dimensions = sizeOf(details.absolutePath);
                  imageName = `${image.internal.contentDigest}${details.ext}`;
                  publicPath = path.join(process.cwd(), `public`, `static/${imageName}`);


                  if (!fsExtra.existsSync(publicPath)) {
                    fsExtra.copy(details.absolutePath, publicPath, function (err) {
                      if (err) {
                        console.error(`error copying file`, err);
                      }
                    });
                  }

                  return _context2.abrupt("return", {
                    width: dimensions.width,
                    height: dimensions.height,
                    src: `/static/` + imageName
                  });

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }))();
      }
    },
    resolutions: {
      type: new GraphQLObjectType({
        name: `ImageSharpResolutions`,
        fields: {
          base64: { type: GraphQLString },
          tracedSVG: {
            type: GraphQLString,
            resolve: function resolve(parent) {
              return getTracedSVG(parent);
            }
          },
          aspectRatio: { type: GraphQLFloat },
          width: { type: GraphQLFloat },
          height: { type: GraphQLFloat },
          src: { type: GraphQLString },
          srcSet: { type: GraphQLString },
          srcWebp: {
            type: GraphQLString,
            resolve: function resolve(_ref4) {
              var file = _ref4.file,
                  image = _ref4.image,
                  fieldArgs = _ref4.fieldArgs;

              // If the file is already in webp format or should explicitly
              // be converted to webp, we do not create additional webp files
              if (image.extension === `webp` || fieldArgs.toFormat === `webp`) {
                return null;
              }
              var args = (0, _extends3.default)({}, fieldArgs, { pathPrefix, toFormat: `webp` });
              return Promise.resolve(resolutions({
                file,
                args
              })).then(function (_ref5) {
                var src = _ref5.src;
                return src;
              });
            }
          },
          srcSetWebp: {
            type: GraphQLString,
            resolve: function resolve(_ref6) {
              var file = _ref6.file,
                  image = _ref6.image,
                  fieldArgs = _ref6.fieldArgs;

              if (image.extension === `webp` || fieldArgs.toFormat === `webp`) {
                return null;
              }
              var args = (0, _extends3.default)({}, fieldArgs, { pathPrefix, toFormat: `webp` });
              return Promise.resolve(resolutions({
                file,
                args
              })).then(function (_ref7) {
                var srcSet = _ref7.srcSet;
                return srcSet;
              });
            }
          },
          originalName: { type: GraphQLString }
        }
      }),
      args: {
        width: {
          type: GraphQLInt,
          defaultValue: 400
        },
        height: {
          type: GraphQLInt
        },
        jpegProgressive: {
          type: GraphQLBoolean,
          defaultValue: true
        },
        grayscale: {
          type: GraphQLBoolean,
          defaultValue: false
        },
        duotone: {
          type: DuotoneGradientType,
          defaultValue: false
        },
        traceSVG: {
          type: PotraceType,
          defaultValue: false
        },
        quality: {
          type: GraphQLInt,
          defaultValue: 50
        },
        toFormat: {
          type: ImageFormatType,
          defaultValue: ``
        },
        cropFocus: {
          type: ImageCropFocusType,
          defaultValue: sharp.strategy.attention
        },
        rotate: {
          type: GraphQLInt,
          defaultValue: 0
        }
      },
      resolve: function resolve(image, fieldArgs, context) {
        var file = getNodeAndSavePathDependency(image.parent, context.path);
        var args = (0, _extends3.default)({}, fieldArgs, { pathPrefix });
        return Promise.resolve(resolutions({
          file,
          args
        })).then(function (o) {
          return Object.assign({}, o, {
            fieldArgs: args,
            image,
            file
          });
        });
      }
    },
    sizes: {
      type: new GraphQLObjectType({
        name: `ImageSharpSizes`,
        fields: {
          base64: { type: GraphQLString },
          tracedSVG: {
            type: GraphQLString,
            resolve: function resolve(parent) {
              return getTracedSVG(parent);
            }
          },
          aspectRatio: { type: GraphQLFloat },
          src: { type: GraphQLString },
          srcSet: { type: GraphQLString },
          srcWebp: {
            type: GraphQLString,
            resolve: function resolve(_ref8) {
              var file = _ref8.file,
                  image = _ref8.image,
                  fieldArgs = _ref8.fieldArgs;

              if (image.extension === `webp` || fieldArgs.toFormat === `webp`) {
                return null;
              }
              var args = (0, _extends3.default)({}, fieldArgs, { pathPrefix, toFormat: `webp` });
              return Promise.resolve(sizes({
                file,
                args
              })).then(function (_ref9) {
                var src = _ref9.src;
                return src;
              });
            }
          },
          srcSetWebp: {
            type: GraphQLString,
            resolve: function resolve(_ref10) {
              var file = _ref10.file,
                  image = _ref10.image,
                  fieldArgs = _ref10.fieldArgs;

              if (image.extension === `webp` || fieldArgs.toFormat === `webp`) {
                return null;
              }
              var args = (0, _extends3.default)({}, fieldArgs, { pathPrefix, toFormat: `webp` });
              return Promise.resolve(sizes({
                file,
                args
              })).then(function (_ref11) {
                var srcSet = _ref11.srcSet;
                return srcSet;
              });
            }
          },
          sizes: { type: GraphQLString },
          originalImg: { type: GraphQLString },
          originalName: { type: GraphQLString }
        }
      }),
      args: {
        maxWidth: {
          type: GraphQLInt,
          defaultValue: 800
        },
        maxHeight: {
          type: GraphQLInt
        },
        grayscale: {
          type: GraphQLBoolean,
          defaultValue: false
        },
        jpegProgressive: {
          type: GraphQLBoolean,
          defaultValue: true
        },
        duotone: {
          type: DuotoneGradientType,
          defaultValue: false
        },
        traceSVG: {
          type: PotraceType,
          defaultValue: false
        },
        quality: {
          type: GraphQLInt,
          defaultValue: 50
        },
        toFormat: {
          type: ImageFormatType,
          defaultValue: ``
        },
        cropFocus: {
          type: ImageCropFocusType,
          defaultValue: sharp.strategy.attention
        },
        rotate: {
          type: GraphQLInt,
          defaultValue: 0
        }
      },
      resolve: function resolve(image, fieldArgs, context) {
        var file = getNodeAndSavePathDependency(image.parent, context.path);
        var args = (0, _extends3.default)({}, fieldArgs, { pathPrefix });
        return Promise.resolve(sizes({
          file,
          args
        })).then(function (o) {
          return Object.assign({}, o, {
            fieldArgs: args,
            image,
            file
          });
        });
      }
    },
    responsiveResolution: {
      deprecationReason: `We dropped the "responsive" part of the name to make it shorter https://github.com/gatsbyjs/gatsby/pull/2320/`,
      type: new GraphQLObjectType({
        name: `ImageSharpResponsiveResolution`,
        fields: {
          base64: { type: GraphQLString },
          aspectRatio: { type: GraphQLFloat },
          width: { type: GraphQLFloat },
          height: { type: GraphQLFloat },
          src: { type: GraphQLString },
          srcSet: { type: GraphQLString },
          originalName: { type: GraphQLString }
        }
      }),
      args: {
        width: {
          type: GraphQLInt,
          defaultValue: 400
        },
        height: {
          type: GraphQLInt
        },
        jpegProgressive: {
          type: GraphQLBoolean,
          defaultValue: true
        },
        grayscale: {
          type: GraphQLBoolean,
          defaultValue: false
        },
        duotone: {
          type: DuotoneGradientType,
          defaultValue: false
        },
        quality: {
          type: GraphQLInt,
          defaultValue: 50
        },
        toFormat: {
          type: ImageFormatType,
          defaultValue: ``
        },
        cropFocus: {
          type: ImageCropFocusType,
          defaultValue: sharp.strategy.attention
        },
        rotate: {
          type: GraphQLInt,
          defaultValue: 0
        }
      },
      resolve: function resolve(image, fieldArgs, context) {
        var file = getNodeAndSavePathDependency(image.parent, context.path);
        var args = (0, _extends3.default)({}, fieldArgs, { pathPrefix });
        return Promise.resolve(resolutions({
          file,
          args
        })).then(function (o) {
          return Object.assign({}, o, {
            fieldArgs: args,
            image,
            file
          });
        });
      }
    },
    responsiveSizes: {
      deprecationReason: `We dropped the "responsive" part of the name to make it shorter https://github.com/gatsbyjs/gatsby/pull/2320/`,
      type: new GraphQLObjectType({
        name: `ImageSharpResponsiveSizes`,
        fields: {
          base64: { type: GraphQLString },
          aspectRatio: { type: GraphQLFloat },
          src: { type: GraphQLString },
          srcSet: { type: GraphQLString },
          sizes: { type: GraphQLString },
          originalImg: { type: GraphQLString },
          originalName: { type: GraphQLString }
        }
      }),
      args: {
        maxWidth: {
          type: GraphQLInt,
          defaultValue: 800
        },
        maxHeight: {
          type: GraphQLInt
        },
        grayscale: {
          type: GraphQLBoolean,
          defaultValue: false
        },
        jpegProgressive: {
          type: GraphQLBoolean,
          defaultValue: true
        },
        duotone: {
          type: DuotoneGradientType,
          defaultValue: false
        },
        quality: {
          type: GraphQLInt,
          defaultValue: 50
        },
        toFormat: {
          type: ImageFormatType,
          defaultValue: ``
        },
        cropFocus: {
          type: ImageCropFocusType,
          defaultValue: sharp.strategy.attention
        },
        rotate: {
          type: GraphQLInt,
          defaultValue: 0
        }
      },
      resolve: function resolve(image, fieldArgs, context) {
        var file = getNodeAndSavePathDependency(image.parent, context.path);
        var args = (0, _extends3.default)({}, fieldArgs, { pathPrefix });
        return Promise.resolve(sizes({
          file,
          args
        })).then(function (o) {
          return Object.assign({}, o, {
            fieldArgs: args,
            image,
            file
          });
        });
      }
    },
    resize: {
      type: new GraphQLObjectType({
        name: `ImageSharpResize`,
        fields: {
          src: { type: GraphQLString },
          tracedSVG: {
            type: GraphQLString,
            resolve: function resolve(parent) {
              return getTracedSVG(parent);
            }
          },
          width: { type: GraphQLInt },
          height: { type: GraphQLInt },
          aspectRatio: { type: GraphQLFloat },
          originalName: { type: GraphQLString }
        }
      }),
      args: {
        width: {
          type: GraphQLInt,
          defaultValue: 400
        },
        height: {
          type: GraphQLInt
        },
        quality: {
          type: GraphQLInt,
          defaultValue: 50
        },
        jpegProgressive: {
          type: GraphQLBoolean,
          defaultValue: true
        },
        pngCompressionLevel: {
          type: GraphQLInt,
          defaultValue: 9
        },
        grayscale: {
          type: GraphQLBoolean,
          defaultValue: false
        },
        duotone: {
          type: DuotoneGradientType,
          defaultValue: false
        },
        base64: {
          type: GraphQLBoolean,
          defaultValue: false
        },
        traceSVG: {
          type: PotraceType,
          defaultValue: false
        },
        toFormat: {
          type: ImageFormatType,
          defaultValue: ``
        },
        cropFocus: {
          type: ImageCropFocusType,
          defaultValue: sharp.strategy.attention
        },
        rotate: {
          type: GraphQLInt,
          defaultValue: 0
        }
      },
      resolve: function resolve(image, fieldArgs, context) {
        var file = getNodeAndSavePathDependency(image.parent, context.path);
        var args = (0, _extends3.default)({}, fieldArgs, { pathPrefix });
        return new Promise(function (resolve) {
          if (fieldArgs.base64) {
            resolve(base64({
              file
            }));
          } else {
            var o = queueImageResizing({
              file,
              args
            });
            resolve(Object.assign({}, o, {
              image,
              file,
              fieldArgs: args
            }));
          }
        });
      }
    }
  };
};