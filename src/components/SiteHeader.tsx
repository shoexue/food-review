import React, { useState } from 'react'
import MainNav from './MainNav'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { store } from '@/lib/types'
import { Button } from './ui/button'
import { PlusIcon } from '@heroicons/react/24/solid'
import AddItemModal from './AddItemModal'
import { Input } from './ui/input'

const SiteHeader = () => {
    const { items, settings, itemsInitialized } = store;
    const [addItemModalOpen, setAddItemModalOpen] = useState(false);

    return (
        <header>
            <div className='flex flex-row w-screen justify-between'>
                <div className='flex flex-row items-center'>
                    <MainNav />
                    <div className="flex items-center space-x-3">
                        <Button onClick={() => setAddItemModalOpen(true)}>
                            <PlusIcon className='w-4 h-4 mr-2' /> Item
                        </Button>
                        <Switch id="airplane-mode"
                            checked={settings.showUnverified}
                            onCheckedChange={(e) => settings.toggleShowUnverified()}
                        />
                        <Label htmlFor="airplane-mode">Show unverified</Label>
                    </div>
                </div>
                <div className='w-96 relative '>
                    <Input />
                </div>

            </div>
            <AddItemModal
                open={addItemModalOpen}
                onClose={() => setAddItemModalOpen(false)}
            />
        </header>
    )
}

export default SiteHeader