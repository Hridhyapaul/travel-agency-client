
const AllPaymentHistoryCard = ({ history, index }) => {
    console.log(history)
    const { name, email, phoneNumber, date, transitionId, tickets } = history;
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const localDate = new Date(date).toLocaleString('en-US', options);

    const accommodationAndCountryList = tickets.map((ticket) => {
        return {
            accommodation: ticket.accommodation,
            country: ticket.country
        };
    });
    const ticketsList = tickets.map((ticket) => ticket.tickets);
    // const country = countryList.map((item) => item)
    const amountList = tickets.map((ticket) => ticket.paidAmount)

    console.log(accommodationAndCountryList)
    console.log(ticketsList);
    return (
        <tr>
            <th>
                <p>{index + 1}</p>
            </th>
            <td>
                <div className="font-bold">{name}</div>
                <div className="text-sm opacity-50">{email}</div>
                <span className="badge badge-ghost badge-sm">{phoneNumber}</span>
            </td>
            <td className="text-center w-[300px]">
                {accommodationAndCountryList.length > 1 ? (
                    accommodationAndCountryList.map((entry, idx) => (
                        <div key={idx}>
                            <p className="h-[50px] flex items-center justify-center">{entry.accommodation}</p>
                            <span className="badge badge-ghost badge-sm mb-2">{entry.country}</span>
                            {idx < accommodationAndCountryList.length - 1 && <hr className="" />}
                        </div>
                    ))
                ) : (
                    accommodationAndCountryList.map((entry, idx) => (
                        <div key={idx}>
                            <p>{entry.accommodation}</p>
                            <span className="badge badge-ghost badge-sm">{entry.country}</span>
                        </div>
                    ))
                )}
            </td>


            <td className="text-center">
                {ticketsList.length > 1 ? (
                    ticketsList.map((ticket, idx) => (
                        <div key={idx}>
                            <p className="h-[50px] flex items-center justify-center">{ticket}</p>
                            {idx < ticketsList.length - 1 && <hr className="" />}
                        </div>
                    ))
                ) : (
                    ticketsList.map((ticket, idx) => (
                        <p key={idx}>{ticket}</p>
                    ))
                )}
            </td>
            <td>
                {amountList.length > 1 ? (
                    amountList.map((amount, idx) => (
                        <div key={idx}>
                            <p className="h-[50px] flex items-center justify-center">{amount}</p>
                            {idx < amountList.length - 1 && <hr className="" />}
                        </div>
                    ))
                ) : (
                    amountList.map((amount, idx) => (
                        <p key={idx}>{amount}</p>
                    ))
                )}
            </td>
            <td>
                <p className='text-center'>{transitionId}</p>
            </td>
            <td>
                <p className='text-center w-[100px]'>{localDate}</p>
            </td>
        </tr>
    );
};

export default AllPaymentHistoryCard;