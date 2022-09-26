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
} from '@makeswift/runtime/controls'
import { ReactRuntime } from '@makeswift/runtime/react'
import { Box, Button, Navigation } from 'components'

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
    cornerColor: Color({ label: 'Corner color' }),
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
