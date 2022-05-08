# sm-modal

[![](https://img.shields.io/npm/v/sm-modal.svg)](https://www.npmjs.com/package/sm-modal)
[![](https://img.shields.io/travis/mpontus/sm-modal.svg)](https://travis-ci.org/pcsaovang/sm-modal)
[![](https://img.shields.io/codecov/c/github/pcsaovang/sm-modal.svg)](https://codecov.io/gh/pcsaovang/sm-modal)
[![](https://img.shields.io/npm/dt/sm-modal.svg)](https://www.npmjs.com/package/sm-modal)

This library does not provide any UI, but instead offers a convenient way to render modal components defined elsewhere.

[**Demo**](https://62652043f75a8f004a790633-vcuzneyiek.chromatic.com/)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Using with component](#use-modal-component)
  - [Using with context(hook)](#use-modalprovider-to-provide-modal-context)
  - [Custom configs](#advance)
- [License](#license)

## Install

```bash
npm install --save sm-modal
```

## Usage

#### Use `Modal` component

```jsx
import { useState } from 'react'
import { Modal } from 'sm-modal'

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState < boolean > false

  const handleShowModal = () => {
    setShowModal(true)
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleShowModal}>Show modal</button>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div>Modal content</div>
      </Modal>
    </div>
  )
}

export default HomePage
```

#### Use `ModalProvider` to provide modal context:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ModalProvider } from 'sm-modal'
import App from './App'

ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>,
  document.getElementById('root')
)
```

Call `useModal` with the dialog component of your choice.

```jsx
import { useModal } from 'sm-modal'

const HomePage: React.FC = () => {
  const { showModal } = useModal()

  const handleShowModal = () => {
    showModal(<div>Modal content</div>)
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleShowModal}>Show modal</button>
    </div>
  )
}

export default HomePage
```

## Advance

Custom config of `ModalProvider`

```jsx
import React from 'react'
import { ModalProvider } from 'sm-modal'
import HomePage from './pages/HomePage'

function App() {
  return (
    <ModalProvider
      configs={{
        cancelText: 'Cancel',
        closable: true,
        closableWithEsc: true,
        maskClosable: true,
        okText: 'Submit',
        title: 'Custom title',
        width: '500px',
        zIndex: 10
      }}
    >
      <HomePage />
    </ModalProvider>
  )
}

export default App
```

## License

MIT © [pcsaovang](https://github.com/pcsaovang)
