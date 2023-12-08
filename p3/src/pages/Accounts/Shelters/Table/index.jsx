import { Link } from "react-router-dom";

function Table({ shelters }) {
    return <table className="table table-striped text-center">
        <thead>
            <tr>
                <th>Shelter Name</th>
                <th>Owner</th>
                <th>City/Province</th>
                <th>Postal Code</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody>
            {shelters.map(shelter => (
                <tr key={shelter.id}>
                    <td><Link to={`/shelters/${shelter.username}`} style={{textDecoration: "none"}}>{shelter.shelter_name}</Link></td>
                    <td>{shelter.username}</td>
                    <td>{shelter.city + "/" + shelter.province}</td>
                    <td>{shelter.postal_code}</td>
                    <td><a style={{textDecoration: "none"}} href={`mailto:${shelter.email}`}>{shelter.email}</a></td>
                    <td>{shelter.phone_number}</td>
                </tr>
            ))}
        </tbody>
    </table>;
}

export default Table;