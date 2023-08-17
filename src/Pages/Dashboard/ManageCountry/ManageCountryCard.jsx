import React from 'react';

const ManageCountryCard = ({country:countryName, index, refetch}) => {
    const {country, countryImage, slogan} = countryName;
    console.log(country)
    return (
        <tr>
            <th>
                <p>{index + 1}</p>
            </th>
        </tr>
    );
};

export default ManageCountryCard;