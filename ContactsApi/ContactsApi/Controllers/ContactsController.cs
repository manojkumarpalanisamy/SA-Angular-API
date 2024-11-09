using ContactsApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ContactsApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly string _jsonFilePath = "data/contacts.json";

        private List<Contact> LoadContacts()
        {
            var jsonData = System.IO.File.ReadAllText(_jsonFilePath);
            return JsonConvert.DeserializeObject<List<Contact>>(jsonData);
        }

        private void SaveContacts(List<Contact> contacts)
        {
            var jsonData = JsonConvert.SerializeObject(contacts, Formatting.Indented);
            System.IO.File.WriteAllText(_jsonFilePath, jsonData);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Contact>> GetContacts() => LoadContacts();

        [HttpGet("{id}")]
        public ActionResult<Contact> GetContact(int id)
        {
            var contacts = LoadContacts();
            var contact = contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null) return NotFound();
            return contact;
        }

        [HttpPost]
        public IActionResult CreateContact(Contact contact)
        {
            var contacts = LoadContacts();
            contact.Id = contacts.Max(c => c.Id) + 1;
            contacts.Add(contact);
            SaveContacts(contacts);
            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateContact(int id, Contact updatedContact)
        {
            var contacts = LoadContacts();
            var contact = contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null) return NotFound();
            contact.FirstName = updatedContact.FirstName;
            contact.LastName = updatedContact.LastName;
            contact.Email = updatedContact.Email;
            SaveContacts(contacts);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id)
        {
            var contacts = LoadContacts();
            var contact = contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null) return NotFound();
            contacts.Remove(contact);
            SaveContacts(contacts);
            return NoContent();
        }
    }

}
