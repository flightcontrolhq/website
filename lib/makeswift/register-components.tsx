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
  TextArea,
} from '@makeswift/runtime/controls'
import { ReactRuntime } from '@makeswift/runtime/react'
import { Box, Button, Code, Lights, Navigation, Plane, PopupVideo, Tabs } from 'components'

ReactRuntime.registerComponent(Button, {
  type: 'button',
  label: 'Button',
  props: {
    className: Style({
      properties: [Style.TextStyle, Style.Width, Style.Margin],
    }),
    text: TextInput({ defaultValue: 'Button text', label: 'Button text' }),
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
  label: 'FC Box',
  props: {
    className: Style({ properties: [Style.Width, Style.Margin, Style.Padding, Style.Border] }),
    height: Select({
      options: [
        {
          label: 'Auto',
          value: 'auto',
        },
        { label: 'Stretch', value: 'stretch' },
      ],
      defaultValue: 'auto',
      label: 'Height',
    }),
    alignItems: Select({
      options: [
        {
          label: 'Top',
          value: 'top',
        },
        { label: 'Middle', value: 'middle' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Space between', value: 'spaceBetween' },
      ],
      defaultValue: 'top',
      label: 'Align items',
    }),
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
        image: Image({ format: Image.Format.WithDimensions, label: 'Logo image' }),
        link: Link({ label: 'Logo link' }),
        alt: TextInput({ label: 'Logo ALT text' }),
      },
    }),
    center: List({
      label: 'Center Links',
      getItemLabel: function (item) {
        return item?.text ?? 'Untitled'
      },
      type: Shape({
        type: {
          text: TextInput({ defaultValue: 'Button text', label: 'Button text' }),
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
      label: 'Right links',
      getItemLabel: function (item) {
        return item?.text ?? 'Untitled'
      },
      type: Shape({
        type: {
          text: TextInput({ defaultValue: 'Button text', label: 'Button text' }),
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
    previewAltText: TextInput({ label: 'Preview ALT text' }),
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
        controls: Checkbox({ label: 'Show controls' }),
        loop: Checkbox({ label: 'Loop' }),
        muted: Checkbox({ label: 'Muted' }),
      },
    }),
  },
})

ReactRuntime.registerComponent(Plane, {
  type: 'plane',
  label: 'Plane',
  props: {
    isAboveTheFold: Checkbox({ label: 'Above the fold' }),
  },
})

ReactRuntime.registerComponent(Code, {
  type: 'code',
  label: 'Code',
  props: {
    className: Style({
      properties: Style.All,
    }),
    code: TextArea({ label: 'Code', defaultValue: "const flightControl = 'is cool!'" }),
    language: Select({
      label: 'Language',
      labelOrientation: 'horizontal',
      options: [
        { value: 'tsx', label: 'tsx' },
        { value: 'ts', label: 'ts' },
        { value: 'js', label: 'js' },
        { value: 'json', label: 'json' },
      ],
      defaultValue: 'ts',
    }),
    maxHeight: Number({
      label: 'Max height',
    }),
  },
})

ReactRuntime.registerComponent(Tabs, {
  type: 'tabs',
  label: 'Tabs',
  props: {
    className: Style({
      properties: Style.All,
    }),
    initialTab: Select({
      label: 'Initial Tab',
      labelOrientation: 'horizontal',
      options: [
        { value: '1', label: 'Tab 1' },
        { value: '2', label: 'Tab 2' },
      ],
      defaultValue: '1',
    }),
    tab1Content: Slot(),
    tab1Text: TextInput({ defaultValue: 'Tab 1 text', label: 'Tab 1 text' }),
    tab2Content: Slot(),
    tab2Text: TextInput({ defaultValue: 'Tab 2 text', label: 'Tab 2 text' }),
  },
})
