import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../../data/product'
import Container from '../../components/Container'
import CardProduct from '../../components/product/CardProduct'
import BannerSlider from '../../components/BannerSlider'

const HomePage = () => {
    const [searchParams] = useSearchParams()
    const allParams = Object.fromEntries([...searchParams])
    const { data: { data: products = [] } = {} } = useProducts({ ...allParams })

    return (
        <div>
            <Container className={'max-w-screen-2xl py-10'}>
                <BannerSlider />
            </Container>
            <Container>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products?.map((product) => (
                        <CardProduct key={product._id} product={product} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default HomePage
