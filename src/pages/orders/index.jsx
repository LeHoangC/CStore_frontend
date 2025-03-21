import Container from '../../components/Container'
import { useOrders } from '../../data/order'
import { FormatPrice } from '../../utils/use-price'
import { Link } from 'react-router-dom'
import { statusOrder } from '../../constants/orderStatus'
import moment from 'moment'
moment.locale('vi')

const OrderItem = ({ order }) => {
    return (
        <div className="flex flex-wrap items-center gap-y-4 py-6">
            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    {order?.order_trackingNumber}
                </dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Ngày đặt hàng:</dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    {moment(order?.createdAt).format('HH:mm DD/MM/YYYY')}
                </dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Giá:</dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    {FormatPrice({ amount: order?.order_checkout.totalPrice })}
                </dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Trạng thái đơn hàng:</dt>
                <dd
                    className={`me-2 mt-1.5 inline-flex items-center rounded ${statusOrder[order?.order_status].color}`}
                >
                    <span className="mr-1">{statusOrder[order?.order_status].icon}</span>
                    {order?.order_status}
                </dd>
            </dl>

            <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                {order?.order_status === 'pending' && (
                    <button
                        type="button"
                        className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                    >
                        Cancel order
                    </button>
                )}
                <Link
                    to={`/order/${order?._id}`}
                    className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                >
                    View details
                </Link>
            </div>
        </div>
    )
}

const OrdersPage = () => {
    const { data } = useOrders()

    return (
        <Container>
            <section className="mt-10">
                <div className="gap-4 sm:flex sm:items-center sm:justify-between mb-10">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Đơn hàng đã mua</h2>

                    {/* <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                        <div>
                            <label
                                htmlFor="order-type"
                                className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Select order type
                            </label>
                            <select
                                id="order-type"
                                defaultValue={'pre-order'}
                                className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            >
                                <option selected>All orders</option>
                                <option value="pre-order">Pre-order</option>
                                <option value="transit">In transit</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <span className="inline-block text-gray-500 dark:text-gray-400"> from </span>

                        <div>
                            <label
                                htmlFor="duration"
                                className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Select duration
                            </label>
                            <select
                                id="duration"
                                defaultValue={'this month'}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            >
                                <option selected>this week</option>
                                <option value="this month">this month</option>
                                <option value="last 3 months">the last 3 months</option>
                                <option value="lats 6 months">the last 6 months</option>
                                <option value="this year">this year</option>
                            </select>
                        </div>
                    </div> */}
                </div>

                <div className="mt-6 flow-root sm:mt-8">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data?.map((order) => (
                            <OrderItem key={order?._id} order={order} />
                        ))}
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default OrdersPage
