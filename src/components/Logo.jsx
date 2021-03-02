import styled from 'styled-components';

import logo from '../logo.svg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand'
})``

function Logo() {
    return (
        <Wrapper href="https://azax25547.github.io">
            <img src={logo} width="50" height="50" alt="azax25547" />
        </Wrapper>
    )
}

export default Logo;