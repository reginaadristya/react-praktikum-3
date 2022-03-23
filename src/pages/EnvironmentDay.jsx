import React, { useState } from 'react'
import { FaSun, FaMoon, FaPlus } from 'react-icons/fa'

import AddForm from '../components/AddForm'
import Card from '../components/Card'
import EditForm from '../components/EditForm'
import Navbar from '../components/Navbar'

function EnvironmentDay() {
    // GET FULL YEAR
    const year = new Date().getFullYear()

    // REQUIRED STATE
    const [eventList, setEventList] = useState([
        { eventName: "Hari Laut dan Samudera Nasional", date: `${year}-01-15` },
        { eventName: "Hari Lahan Basah Sedunia", date: `${year}-02-02` },
        { eventName: "Hari Peduli Sampah Nasional", date: `${year}-02-21` },
        { eventName: "Hari Hutan Sedunia", date: `${year}-03-21` },
        { eventName: "Hari Air Sedunia", date: `${year}-03-22` },
        { eventName: "Hari Meteorologi Sedunia", date: `${year}-03-23` },
        { eventName: "Hari Bumi", date: `${year}-04-22` },
        { eventName: "Hari Burung Migratori Internasional", date: `${year}-05-03` },
    ])
    const [popUpStack, setPopUpStack] = useState([])
    const [search, setSearch] = useState('')
    const [filteredResults, setFilteredResults] = useState([])

    // SEARCH EVENT
    function searchItems(searched) {
        setSearch(searched)
        const filteredEventList = eventList.filter(event => event.eventName.toLowerCase().includes(search.toLowerCase()))

        setFilteredResults(filteredEventList)
    }

    // HANDLE POPUP
    const pushPopUp = (element) => {
        setPopUpStack([...popUpStack, element])
    }

    const popPopUp = () => {
        setPopUpStack(popUpStack.slice(0, -1))
    }

    const openForm = () => {
        pushPopUp(<AddForm key={2} addEvent={addEvent} onClose={popPopUp} />)
    }

    // Alert
    function Alert(text) {
        alert(text)
    }

    // ADD FORM
    function addEvent(event) {
        event.preventDefault()

        const eventName = event.target.eventName.value
        const date = event.target.date.value
        Alert(`${eventName}, Kegiatan baru telah ditambahkan!`)

        setEventList([...eventList, { eventName, date }])
        popPopUp()
    }

    // EDIT FORM
    const openEditForm = (eventName, date, index) => {
        pushPopUp(<EditForm key={1} eventName={eventName} date={date} editEvent={editEvent} deleteEvent={deleteEvent} index={index} onClose={popPopUp} />)
    }

    function editEvent(event) {
        event.preventDefault()

        const eventName = event.target.eventName.value
        const date = event.target.date.value
        const index = event.target.index.value

        const newEventList = [...eventList]
        newEventList[index] = { eventName, date }

        setEventList(newEventList)

        if (eventName === eventList[index].eventName && date === eventList[index].date) {
            Alert('Tidak ada perubahan')
        } else {
            Alert(`${eventName}, Kegiatan telah diubah!`)
        }

        popPopUp()
    }

    // DELETE FORM
    function deleteEvent(event, index) {
        const confirm = window.confirm('Apakah anda yakin ingin menghapus kegiatan ini?')
        const eventNameVal = eventList[index].eventName

        if (confirm === true) {
            event.preventDefault()

            const newEventList = [...eventList]
            newEventList.splice(index, 1)

            setEventList(newEventList)

            Alert(`Kegiatan ${eventNameVal} telah dihapus!`)
            popPopUp()
        } else {
            Alert(`Kegiatan ${eventNameVal} tidak dihapus!`)
            popPopUp()
        }
    }

    return (
        <>
            <div>
                {popUpStack}
                <div className='dark:bg-gray-600 dark:text-gray-300 transition-all ease-in-out duration-300 min-h-screen flex flex-col justify-between'>
                    <Navbar />
                    <div className='container px-10 py-10 mx-auto'>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='font-bold text-center md:text-4xl text-3xl mb-10'>Agenda Hari Lingkungan Hidup</h1>
                            <div className='flex justify-center items-center'>
                                <div className='form-section'>
                                    <input placeholder='Coba cari disini...' onChange={(event) => searchItems(event.target.value)} className='w-full flex-1 bg-gray-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:ring ring-blue-300 dark:ring-blue-500 rounded outline-none transition duration-100 px-3 py-2' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container px-10 mx-auto'>
                        <div className='flex justify-end items-center'>
                            <button type='button' onClick={openForm} className='inline-block bg-red-600 dark:bg-red-700 hover:bg-red-700 focus-visible:ring ring-blue-300 text-white text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-4 py-3'><FaPlus /></button>
                        </div>
                        <div className='border-b my-5 dark:border-gray-500'></div>
                        <div className='flex flex-wrap -m-4'>
                            {
                                search.length > 1 ? (
                                    filteredResults.map((event, index) => (
                                        <Card key={index} eventName={event.eventName} date={event.date} index={index} openEditForm={openEditForm} />
                                    ))
                                ) : (
                                    eventList.map((event, index) => (
                                        <Card key={index} eventName={event.eventName} date={event.date} index={index} openEditForm={openEditForm} />
                                    ))
                                )
                            }
                        </div>
                    </div>
                    <div>
                        <h1 className='text-white cursor-default'>.</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnvironmentDay