import {
  Checkbox,
  Color,
  Link,
  List,
  Select,
  Shape,
  Slot,
  Style,
  TextInput,
  Image,
  Number,
} from '@makeswift/runtime/controls'
import { ReactRuntime } from '@makeswift/runtime/react'
import { Box, Button, Lights, Navigation, Plane, PopupVideo } from 'components'

ReactRuntime.registerComponent(Button, {
  type: 'button',
  label: 'Button',
  props: {
    className: Style({
      properties: [Style.TextStyle, Style.Width, Style.Margin],
    }),
    text: TextInput({ defaultValue: '', label: 'Button Text' }),
    link: Link({ label: 'Link' }),
    size: Select({
      label: 'Size',
      labelOrientation: 'vertical',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'large', label: 'Large' },
      ],
      defaultValue: 'large',
    }),
    variant: Select({
      label: 'Variant',
      labelOrientation: 'vertical',
      options: [
        { value: 'outlined', label: 'Outlined' },
        { value: 'solid', label: 'Solid' },
      ],
      defaultValue: 'solid',
    }),
    showArrows: Checkbox({
      label: 'Show Arrows?',
      defaultValue: true,
    }),
    cornerColor: Color({ label: 'Corner color' }),
  },
})

ReactRuntime.registerComponent(Box, {
  type: 'box',
  label: 'Box',
  props: {
    className: Style({ properties: [Style.Width, Style.Margin, Style.Padding, Style.Border] }),
    cornerColor: Color({ labelOrientation: 'vertical', label: 'Corner color' }),
    cornersVisible: Checkbox({ label: 'Corners visible', defaultValue: true }),
    backgroundColor: Color({ labelOrientation: 'vertical', label: 'Background color' }),
    children: Slot(),
  },
})

ReactRuntime.registerComponent(Navigation, {
  type: 'navigation',
  label: 'Navigation',
  props: {
    className: Style({ properties: [Style.Width, Style.Margin, Style.Padding] }),
    logo: Shape({
      type: {
        image: Image({ format: Image.Format.WithDimensions, label: 'Logo Image' }),
        link: Link({ label: 'Logo Link' }),
      },
    }),
    center: List({
      getItemLabel: function (item) {
        return item?.text ?? 'Untitled'
      },
      type: Shape({
        type: {
          text: TextInput({ defaultValue: '', label: 'Button Text' }),
          link: Link({ label: 'Link' }),
          variant: Select({
            label: 'Variant',
            labelOrientation: 'vertical',
            options: [
              { value: 'solid', label: 'Solid' },
              { value: 'text', label: 'text' },
            ],
            defaultValue: 'text',
          }),
        },
      }),
    }),
    right: List({
      getItemLabel: function (item) {
        return item?.text ?? 'Untitled'
      },
      type: Shape({
        type: {
          text: TextInput({ defaultValue: '', label: 'Button Text' }),
          link: Link({ label: 'Link' }),
          variant: Select({
            label: 'Variant',
            labelOrientation: 'vertical',
            options: [
              { value: 'solid', label: 'Solid' },
              { value: 'text', label: 'text' },
            ],
            defaultValue: 'text',
          }),
        },
      }),
    }),
  },
})

ReactRuntime.registerComponent(Lights, {
  type: 'lights',
  label: 'Lights',
  props: {
    className: Style({ properties: [Style.Width, Style.Margin, Style.Padding] }),
  },
})

const ASPECT_RATIO = 16 / 9

ReactRuntime.registerComponent(PopupVideo, {
  type: 'popupVideo',
  label: 'Popup Video',
  props: {
    className: Style({
      properties: [Style.Margin, Style.Padding, Style.Width, Style.Border],
    }),
    preview: Image({ label: 'Preview', format: Image.Format.WithDimensions }),
    previewAltText: TextInput({ label: 'Preview `alt` text' }),
    isAboveTheFold: Checkbox({ label: 'Above the fold' }),
    video: Shape({
      type: {
        url: TextInput({ label: 'Video URL' }),
        aspectRatio: Number({
          labelOrientation: 'vertical',
          label: 'Video aspect ratio',
          step: 0.01,
          defaultValue: ASPECT_RATIO,
        }),
        autoPlay: Checkbox({ label: 'Autoplay' }),
        controls: Checkbox({ label: 'Show Controls' }),
        loop: Checkbox({ label: 'Loop' }),
        muted: Checkbox({ label: 'Muted' }),
      },
    }),
  },
})

ReactRuntime.registerComponent(Plane, {
  type: 'plane',
  label: 'Plane',
  props: {},
})
