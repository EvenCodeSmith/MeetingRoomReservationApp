using MeetingRoomReservationAPI.Models;
using MeetingRoomReservationAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomReservationAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class MeetingRoomsController : ControllerBase
    {
        private readonly MeetingRoomService _meetingRoomService;
        private readonly ReservationService _reservationService;

        public MeetingRoomsController(MeetingRoomService service, ReservationService reservation)
        {
            _meetingRoomService = service;
            _reservationService = reservation;
        }

        [HttpGet]
        public async Task<ActionResult<List<MeetingRoom>>> Get() =>
            await _meetingRoomService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<MeetingRoom>> Get(string id)
        {
            var room = await _meetingRoomService.GetAsync(id);
            if (room == null) return NotFound();
            return room;
        }

        [HttpPost]
        public async Task<IActionResult> Create(MeetingRoom room)
        {
            if (room.Capacity < 1) //Wenn Kapazität kleiner ist als 1 fange an zu twerken!!!!!!
            {
                return BadRequest("Kapazität des Raumes muss mindestens 1 Persons betragen");
            }


            await _meetingRoomService.CreateAsync(room);
            return CreatedAtAction(nameof(Get), new { id = room.Id }, room);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, MeetingRoom room)
        {
            var existing = await _meetingRoomService.GetAsync(id);
            if (existing == null) return NotFound();
            room.Id = id;
            await _meetingRoomService.UpdateAsync(id, room);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var room = await _meetingRoomService.GetAsync(id);
            if (room == null)
                return NotFound();

            var reservations = await _reservationService.GetAsync();
            if (reservations == null)
            {
                await _meetingRoomService.DeleteAsync(id);
                return NoContent();
            }

            if (reservations.Any(r => r.RoomId == id))
            {
                return Conflict("Der Raum kann nicht gelöscht werden, da er noch Reservierungen hat.");
            }

            await _meetingRoomService.DeleteAsync(id);
            return NoContent();
        }

    }
}