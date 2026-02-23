import styled from 'styled-components'

const BaseCard = styled.div`
    background: #f0f0f0;
    padding: 15px;
    border-radius: 5px;
    margin: 12px;
`

const ElevatedCard = styled(BaseCard)`
	background: #bbb;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
`

const PrimaryCard = styled(BaseCard)`
	background: white;
	border : 1px solid palevioletred;
	color: palevioletred;
`
const SecondaryCard = styled(BaseCard)`
	background: white;
	border: 1px solid paleturquoise;
	color: paleturquoise;
`

const Card_Variant_Map = {
    standard: BaseCard,
    elevated: ElevatedCard,
    primary: PrimaryCard,
    secondary: SecondaryCard,
}

function CardLayout({children}) {
    return (
        <div>
            {children}
        </div>
    )
}

function CardContent({title, children}) {
    return (
        <>
            {title && (<h2>{title}</h2>)}
            <p>{children}</p>
        </>
    )
}

function Card({ as="article", variant = 'standard', children}) {
    const CardComponent = Card_Variant_Map[variant] ?? BaseCard;

    return (
        <CardComponent as={as}>
            <CardLayout>
                {children}
            </CardLayout>
        </CardComponent>
    )
}

Card.Content = CardContent;

export default Card;