/**
 * @providesModule Ring
 */
'use strict';

const NativeMethodsMixin = require('NativeMethodsMixin');
const PropTypes = require('prop-types');
const React = require('React');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const View = require('View');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformColorPropTypes = require('LayoutAndTransformColorPropTypes');

const createReactClass = require('create-react-class');
const requireNativeComponent = require('requireNativeComponent');
const resolveAssetSource = require('resolveAssetSource');

/**
 * Ring constructs a sphere-type 3D primitive in your scene.
 *
 * It can be sized through a `radius` property, which takes numeric values
 * measured in meters. You can also specify the number of width and height
 * segments with the `widthSegments` and `heightSegments` props.
 *
 * ```
 * <Ring
 *   radius={0.5}
 *   widthSegments={20}
 *   heightSegments={12}
 * />
 * ```
 *
 * Like all 3D primitives, Ring also supports the `lit`, `texture`, and `wireframe` props.
 * If `lit` is true, the Ring's materials are affected by scene lighting.
 * If `wireframe` is true, the Ring renders in a wireframe style.
 * If `texture` is specified, React VR looks up the corresponding image
 * and uses it to texture the Ring. This can be a string, an asset() call, or a require().
 *
 * <Ring
 *   lit={true}
 *   texture={asset('orb.png')}
 * />
 */

const Ring = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformColorPropTypes),

    /**
     * The lit property specifies if the Model is affected by lights placed in the scene.
     */
    lit: PropTypes.bool,

    /**
     * Set material parameters in three.js
     */
    materialParameters: PropTypes.object,

    /**
     * The texture property specifies the url of the texture to be used for the Model.
     * To make texture repeat, pass an object with `repeat` property, for example:
     * `texture={{ ...asset('path/to/texture.jpg'), repeat: [4, 4] }}`
     *
     * First and second element in `repeat` sets how many times texture is repeated
     * in x and y directions.
     */
    texture: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({
        uri: PropTypes.string.isRequired,
        repeat: PropTypes.arrayOf(PropTypes.number),
      }),
    ]),

    /**
     * Specifying true for this property causes the object to be displayed as a wireframe
     */
    wireframe: PropTypes.bool,

    /**
     * The radius in meters of the sphere
     */
    radius: PropTypes.number,

    /**
     * The number of segments around the sphere. Large corresponds to a smoother sphere but
     * is slower to render
     */
    widthSegments: PropTypes.number,

    /**
     * The number of segments between the poles of the sphere. Large corresponds to a smoother
     * sphere but is slower to render
     */
    heightSegments: PropTypes.number,
  },

  viewConfig: {
    uiViewClassName: 'Ring',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
      radius: true,
      widthSegments: true,
      heightSegments: true,
    },
  },

  getDefaultProps() {
    return {
      radius: 0.5,
      widthSegments: 8,
      heightSegments: 6,
    };
  },

  render() {
    let {texture, ...rest} = this.props;
    if (typeof texture === 'number') {
      texture = resolveAssetSource(texture);
    }
    rest.style = rest.style || {};
    if (!rest.style.position) {
      rest.style.position = 'absolute';
    }
    return <RKRing {...rest} texture={texture} />;
  },
});

const RKRing = requireNativeComponent('Ring', Ring, {});

module.exports = Ring;
