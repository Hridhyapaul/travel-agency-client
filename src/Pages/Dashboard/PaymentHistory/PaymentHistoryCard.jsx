const PaymentHistoryCard = ({ history, index }) => {
    console.log(history)
    const { date, price, quantity, transitionId, tickets, accommodationName } = history;
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const localDate = new Date(date).toLocaleString('en-US', options);

    const accommodationList = tickets.map((ticket) => ticket.accommodation);
    const ticketsList = tickets.map((ticket) => ticket.tickets);
    const countryList = tickets.map((ticket) => ticket.country)

    console.log(accommodationList)
    console.log(ticketsList);

    return (
        <tr>
            <th>
                <p>{index + 1}</p>
            </th>
            <td className="text-center">
                {accommodationList.length > 1 ? (
                    accommodationList.map((accommodation, idx) => (
                        <div key={idx}>
                            <p className="h-[50px] flex items-center justify-center">{accommodation}</p>
                            <hr key={idx} className="" />
                        </div>
                        
                    ))
                ) : (
                    accommodationList.map((accommodation, idx) => (
                        <p key={idx}>{accommodation}</p>
                    ))
                )}
            </td>

            <td className="text-center">
                {countryList.length > 1 ? (
                    countryList.map((country, idx) => (
                        <div key={idx}>
                            <p className="h-[50px] flex items-center justify-center">{country}</p>
                            <hr className="" />
                        </div>
                    ))
                ) : (
                    countryList.map((country, idx) => (
                        <p key={idx}>{country}</p>
                    ))
                )}
            </td>

            <td className="text-center">
                {ticketsList.length > 1 ? (
                    ticketsList.map((ticket, idx) => (
                        <div key={idx}>
                            <p className="h-[50px] flex items-center justify-center">{ticket}</p>
                            <hr className="" />
                        </div>
                    ))
                ) : (
                    ticketsList.map((ticket, idx) => (
                        <p key={idx}>{ticket}</p>
                    ))
                )}
            </td>
            <td><p className='text-center'>${price}</p></td>
            <td>
                <p className='text-center'>{transitionId}</p>
            </td>
            <td>
                <p className='text-center'>{localDate}</p>
            </td>
        </tr>
    );
};

export default PaymentHistoryCard;