using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using szamhalGY.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace szamhalGY.Controllers
{
    [Route("api/autok")]
    [ApiController]
    public class AutoController : ControllerBase
    {
        [HttpGet]
        [Route("count")]
        public int Count()
        {
            szamhal_autokContext context = new szamhal_autokContext();
            int rekordokSzama = (from x in context.Autos
                                 select x).Count(); ;

            return rekordokSzama;
        }


        // GET: api/autok
        [HttpGet]
        public IEnumerable<Auto> Get()
        {
            szamhal_autokContext context = new szamhal_autokContext();
            return context.Autos.ToList();
        }

        // GET api/autok/5
        [HttpGet("{id}")]
        public Auto Get(int id)
        {
            szamhal_autokContext context = new szamhal_autokContext();
            var keresettAuto = (from x in context.Autos
                                where x.AutoSk == id
                                select x).FirstOrDefault();
            return keresettAuto;
        }

        // POST api/autok
        [HttpPost]
        public void Post([FromBody] Auto ujAuto)
        {
            szamhal_autokContext context = new szamhal_autokContext();
            context.Autos.Add(ujAuto);
            context.SaveChanges();
        }

        // PUT api/autok/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/autok/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            szamhal_autokContext context = new szamhal_autokContext();
            var torlendoAuto = (from x in context.Autos
                                where x.AutoSk == id
                                select x).FirstOrDefault();
            context.Remove(torlendoAuto);
            context.SaveChanges();
        }

    }
}
