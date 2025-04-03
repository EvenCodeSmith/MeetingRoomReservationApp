using MeetingRoomReservationAPI.Models;
using MeetingRoomReservationAPI.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MeetingRoomReservationAPI.Services
{

    public class ReservationService
    {
        private readonly IMongoCollection<Reservation> _reservations;

        public ReservationService(IMongoCollection<Reservation> reservations)
        {
            _reservations = reservations;
        }
        public ReservationService(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var db = client.GetDatabase(settings.Value.DatabaseName);
            _reservations = db.GetCollection<Reservation>(settings.Value.ReservationsCollectionName);
        }

        public async Task<List<Reservation>> GetAsync() =>
            await _reservations.Find(_ => true).ToListAsync();

        public async Task<Reservation?> GetAsync(string id) =>
            await _reservations.Find(r => r.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Reservation r) =>
            await _reservations.InsertOneAsync(r);

        public async Task DeleteAsync(string id) =>
            await _reservations.DeleteOneAsync(r => r.Id == id);

        public async Task UpdateAsync(string id, Reservation reservation) =>
            await _reservations.ReplaceOneAsync(r => r.Id == id, reservation);

        public async Task<bool> IsOverlappingReservationAsync(string roomId, DateTime start, DateTime end)
        {
            var overlapping = await _reservations.Find(r =>
                r.RoomId == roomId &&
                r.StartTime < end &&
                r.EndTime > start
            ).FirstOrDefaultAsync();

            return overlapping != null;
        }
    }
}