import React from 'react'
import { Story, ComponentMeta } from '@storybook/react'
import { Button } from '../Button'
import { useModal, ModalProvider } from '../Context'
import { ModalOptions, ModalProviderProps } from '../types'

const configs: ModalOptions = {
  title: 'Example modal',
  closable: true,
  closableWithEsc: true,
  maskClosable: true,
  okText: 'Submit',
  cancelText: 'Cancel',
  width: '500px',
  zIndex: 10
}

export default {
  title: 'Example/With hook',
  component: ModalProvider,
  argTypes: {
    action: 'clicked'
  },
  args: {
    configs
  },
  decorators: [
    (Story, props) => {
      return (
        <ModalProvider {...props.args}>
          <Story />
        </ModalProvider>
      )
    }
  ]
} as ComponentMeta<typeof ModalProvider>

const Template: Story<ModalProviderProps> = (args) => {
  const { showModal } = useModal()
  return <Button onClick={() => showModal(<ModalContent />)}>Open modal</Button>
}

export const Default: Story<ModalProviderProps> = Template.bind({})
Default.args = {}

export const CustomHeader: Story<ModalProviderProps> = Template.bind({})
CustomHeader.args = {
  configs: {
    ...configs,
    customHeader: (
      <div
        style={{
          padding: '10px',
          borderBottom: '1px solid green',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <strong>Custom header</strong>
        <Button ghost noSpace>
          x
        </Button>
      </div>
    )
  }
}

export const CustomFooter: Story<ModalProviderProps> = Template.bind({})
CustomFooter.args = {
  configs: {
    ...configs,
    customFooter: (
      <div
        style={{
          padding: '10px',
          borderTop: '1px solid green',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Button>Cancel</Button>
        <Button theme='primary'>OK</Button>
      </div>
    )
  }
}

const ModalContent = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima itaque
      doloribus nesciunt quam pariatur adipisci nam debitis ipsam accusamus,
      officia iste expedita at maiores deleniti minus hic laborum sint.
      Reprehenderit!
    </div>
  )
}
