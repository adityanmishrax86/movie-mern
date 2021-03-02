import styled from "styled-components";
import Links from "./Links";
import Logo from "./Logo";

const Container = styled.div.attrs({
    className: 'container'
})``

const Nav = styled.div.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark'
})`margin-bottom:20px`

function Navbar() {
    return (
        <Container>
            <Nav>
                <Logo />
                <Links />
            </Nav>
        </Container>
    )
}

export default Navbar;