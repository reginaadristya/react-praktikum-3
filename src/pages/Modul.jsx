import React, { useState } from 'react'
import { FaSun, FaMoon, FaPlus } from 'react-icons/fa'

import AddFormModul from '../components/AddFormModul'
import CardModul from '../components/CardModul'
import EditFormModul from '../components/EditFormModul'
import Navbar from '../components/Navbar'

function Modul() {
    // GET YEAR
    const year = new Date().getFullYear()

    // REQUIRED STATE
    const [book, setBook] = useState([
        {
            isbn: "12345",
            bookName: "Bulan",
            author: "Tere Liye",
            publisher: "CV Harapan Kita",
            price: 90000,
            cover: "https://cdnwpseller.gramedia.net/wp-content/uploads/2021/10/08110223/BULAN-TERE-LIYE.jpg"
        },
        {
            isbn: "12346",
            bookName: "Anak Badai",
            author: "Tere Liye",
            publisher: "CV Nusa Bangsa",
            price: 80000,
            cover: "https://assets.kompasiana.com/items/album/2019/10/31/si-anak-badai-dpn-low-5dba8c38d541df530719ac92.jpg?t=o&v=770"
        },
        {
            isbn: "54321",
            bookName: "Bumi",
            author: "Tere Liye",
            publisher: "CV Nusa Bangsa",
            price: 70000,
            cover: "https://upload.wikimedia.org/wikipedia/id/4/49/Bumi_%28sampul%29.jpg"
        },
    ])
    const [popUpStack, setPopUpStack] = useState([])
    const [search, setSearch] = useState('')
    const [filteredResults, setFilteredResults] = useState([])

    // SEARCH EVENT
    function searchItems(searched) {
        setSearch(searched)
        const filteredBook = book.filter(event => event.bookName.toLowerCase().includes(search.toLowerCase()))

        setFilteredResults(filteredBook)
    }

    // HANDLE POPUP
    const pushPopUp = (element) => {
        setPopUpStack([...popUpStack, element])
    }

    const popPopUp = () => {
        setPopUpStack(popUpStack.slice(0, -1))
    }

    const openForm = () => {
        pushPopUp(<AddFormModul key={2} addBook={addBook} onClose={popPopUp} />)
    }

    // Alert
    function Alert(text) {
        alert(text)
    }

    // ADD FORM
    function addBook(event) {
        event.preventDefault()

        const bookName = event.target.bookName.value
        const author = event.target.author.value
        const publisher = event.target.publisher.value
        const price = event.target.price.value
        const cover = event.target.cover.value
        Alert(`${bookName}, Buku baru telah ditambahkan!`)

        setBook([...book, { bookName, author, publisher, price, cover }])
        popPopUp()
    }

    // EDIT FORM
    const openEditForm = (bookName, author, publisher, price, cover, index) => {
        pushPopUp(<EditFormModul key={1} bookName={bookName} author={author} publisher={publisher} price={price} cover={cover} editBook={editBook} deleteBook={deleteBook} index={index} onClose={popPopUp} />)
    }

    function editBook(event) {
        event.preventDefault()

        const bookName = event.target.bookName.value
        const author = event.target.author.value
        const publisher = event.target.publisher.value
        const price = event.target.price.value
        const cover = event.target.cover.value
        const index = event.target.index.value

        const newBook = [...book]
        newBook[index] = { bookName, author, publisher, price, cover }

        setBook(newBook)

        if (bookName === book[index].bookName && author === book[index].author && publisher === book[index].publisher && price === book[index].price && cover === book[index].cover) {
            Alert('Tidak ada perubahan')
        } else {
            Alert(`${bookName}, Buku telah diubah!`)
        }

        popPopUp()
    }

    // DELETE FORM
    function deleteBook(event, index) {
        const confirm = window.confirm('Apakah anda yakin ingin menghapus Buku ini?')
        const bookNameVal = book[index].bookName

        if (confirm === true) {
            event.preventDefault()

            const newBook = [...book]
            newBook.splice(index, 1)

            setBook(newBook)

            Alert(`Buku ${bookNameVal} telah dihapus!`)
            popPopUp()
        } else {
            Alert(`Buku ${bookNameVal} tidak dihapus!`)
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
                            <h1 className='font-bold text-center md:text-4xl text-3xl mb-10'>Galeri Buku</h1>
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
                                        <CardModul key={index} bookName={event.bookName} author={event.author} publisher={event.publisher} price={event.price} cover={event.cover} index={index} openEditForm={openEditForm} />
                                    ))
                                ) : (
                                    book.map((event, index) => (
                                        <CardModul key={index} bookName={event.bookName} author={event.author} publisher={event.publisher} price={event.price} cover={event.cover} index={index} openEditForm={openEditForm} />
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className=''>
                    <h1 className='text-white cursor-default'>.</h1>
                </div>
            </div>
        </>
    )
}

export default Modul