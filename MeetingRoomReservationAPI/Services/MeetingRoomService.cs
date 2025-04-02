using MeetingRoomReservationAPI.Models;
using MeetingRoomReservationAPI.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MeetingRoomReservationAPI.Services
{

    public class MeetingRoomService
    {
        private readonly IMongoCollection<MeetingRoom> _meetingRooms;

        public MeetingRoomService(IOptions<MongoDBSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.ConnectionString);
            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _meetingRooms = database.GetCollection<MeetingRoom>(settings.Value.MeetingRoomsCollectionName);
        }

        public async Task<List<MeetingRoom>> GetAsync() =>
            await _meetingRooms.Find(_ => true).ToListAsync();

        public async Task<MeetingRoom?> GetAsync(string id) =>
            await _meetingRooms.Find(r => r.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(MeetingRoom room) =>
            await _meetingRooms.InsertOneAsync(room);

        public async Task UpdateAsync(string id, MeetingRoom updatedRoom) =>
            await _meetingRooms.ReplaceOneAsync(r => r.Id == id, updatedRoom);

        public async Task DeleteAsync(string id) =>
            await _meetingRooms.DeleteOneAsync(r => r.Id == id);
    }

}