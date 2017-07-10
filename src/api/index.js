const Host = process.env.API_HOST
const AUTH_SERVER_HOST = process.env.AUTH_SERVER_HOST

export default {
    getUserByToken: Host + '/api/userinfo',
    searchUser: AUTH_SERVER_HOST + '/api/usersearch',
    getUserById: (userId) => AUTH_SERVER_HOST + '/api/userinfo/' + userId,
    Tickets: Host + '/api/tickets',
    Ticket: (ticketId) => Host + '/api/tickets/' + ticketId
}
