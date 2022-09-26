import { Checkbox, Color, Link, Select, Style, TextInput } from '@makeswift/runtime/controls'
import { ReactRuntime } from '@makeswift/runtime/react'
import { Button } from 'components'

// Register your components here!

ReactRuntime.registerComponent(props => <p {...props}>Hello, world!</p>, {
  type: 'hello-world',
  label: 'Hello, world!',
  props: {
    className: Style({ properties: Style.All }),
  },
})

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
