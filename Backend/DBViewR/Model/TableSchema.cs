using System.Text.Json.Serialization;

namespace DBViewR.Model
{
    public class TableSchema
    {
        [JsonPropertyName("Name")]
        public string Name { get; set; }
        [JsonPropertyName("Schema")]
        public string Schema { get; set; }
        
    }
}
