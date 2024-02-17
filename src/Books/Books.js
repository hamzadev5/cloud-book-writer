import './Books.css';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import AuthService from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState();

    const [showModal, setShowModal] = useState(false);
    const [newBookTitle, setNewBookTitle] = useState('');
    const [sectionsArray, setSectionsArray] = useState([]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const navigate = useNavigate();

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        try {
            const result = await AuthService.getBooks();
            setBooks(result);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddBook = async () => {
        try {
            const result = await AuthService.addBook(newBookTitle, sectionsArray);
            handleCloseModal();
            getBooks();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    // Recursive function to render sections
    const renderSections = (sections) => {
        return (
            <ul>
                {sections?.map((section) => (
                    <li key={section.id}>
                        {section.title}
                        {section.sectionsArray}
                    </li>
                ))}
            </ul>
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('clbkUserId');
        navigate('/login');
    }

    return (
        <Container>
            <Button variant="primary" type="button" className='logout-btn' onClick={handleLogout}>
                Logout
            </Button>
            <Row className="mt-3">
                <Col>
                    <h1>Book List</h1>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Button variant="primary" onClick={handleShowModal}>
                        Add Book
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>{books?.map((book) => renderSections([book]))}</Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter book title"
                                value={newBookTitle}
                                onChange={(e) => setNewBookTitle(e.target.value)}
                            />
                            <Form.Label>Sections</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter book sections"
                                value={sectionsArray}
                                onChange={(e) => setSectionsArray(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddBook}>
                        Add Book
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BookList;
