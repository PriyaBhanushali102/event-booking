import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Button from './Button'

export default function DemoDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="ml-3">Open demo</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-medium">Demo dialog</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-slate-600">This is a simple Radix + shadcn-style dialog.</Dialog.Description>
          <div className="mt-4 flex justify-end">
            <Dialog.Close asChild>
              <Button variant="primary">Close</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
