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

        public MeetingRoomsController(MeetingRoomService service)
        {
            _meetingRoomService = service;
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
            if (room.Capacity >= 1)
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
            if (room == null) return NotFound();
            await _meetingRoomService.DeleteAsync(id);
            return NoContent();
        }
    }
}