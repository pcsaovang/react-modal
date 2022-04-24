import React from 'react'
import { Story, ComponentMeta } from '@storybook/react'
import { useArgs } from '@storybook/client-api'
import { Button } from '../Button'
import { Modal, ModalProps } from '../Modal'

export default {
  title: 'Example/With component',
  component: Modal,
  args: {
    title: 'Example modal',
    closable: true,
    closableWithEsc: true,
    maskClosable: true,
    show: false,
    okText: 'Submit',
    cancelText: 'Cancel',
    width: '500px',
    zIndex: 10
  },
  argTypes: {
    onOk: { action: 'clicked' },
    onClose: { action: 'clicked' }
  }
} as ComponentMeta<typeof Modal>

const Template: Story<ModalProps> = (args) => {
  const [_, updateArgs] = useArgs()

  return (
    <div>
      <Button
        onClick={() => updateArgs({ ...args, show: true })}
        data-testid='open-modal-button'
      >
        Open modal
      </Button>
      <Modal {...args} onClose={() => updateArgs({ ...args, show: false })}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima itaque
        doloribus nesciunt quam pariatur adipisci nam debitis ipsam accusamus,
        officia iste expedita at maiores deleniti minus hic laborum sint.
        Reprehenderit!
      </Modal>
    </div>
  )
}

export const Default: Story<ModalProps> = Template.bind({})
Default.args = {}

export const CustomHeader: Story<ModalProps> = Template.bind({})
CustomHeader.args = {
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
        Close
      </Button>
    </div>
  )
}

export const CustomFooter: Story<ModalProps> = Template.bind({})
CustomFooter.args = {
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
      <Button theme="primary">OK</Button>
    </div>
  )
}
