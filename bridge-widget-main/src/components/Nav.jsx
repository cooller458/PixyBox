import React from 'react';
import { Navbar, Container, Brand, Toggle, Collapse, Nav } from 'react-bootstrap';
import Logo from '../assets/img/Logo.svg';
import Fb from '../assets/img/icons/fb.svg';
import Tw from '../assets/img/icons/tw.svg';
import In from '../assets/img/icons/in.svg';

function NavArea() {
    return (
        <section className="headerArea">
            <Navbar expand="lg" className="customeNav">
                <Container >
                    <Navbar.Brand href="#"><img src={Logo} class="navBrand" alt=""/></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav
                            className="ml-auto me-auto"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">About Ust</Nav.Link>
                            <Nav.Link href="#action2">Roadmap</Nav.Link>
                            <Nav.Link href="#action2">Community Wallet</Nav.Link>
                            <Nav.Link href="#action2">Rarity</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <ul className="socialList">
                        <li>
                            <a href="#" target="_blank" rel="noopener noreferrer"><img src={Fb}/></a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel="noopener noreferrer"><img src={Tw}/></a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel="noopener noreferrer"><img src={In}/></a>
                        </li>
                    </ul>
                </Container>
            </Navbar>
        </section>
    )
}

export default NavArea;
