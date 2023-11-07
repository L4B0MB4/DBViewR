using System.Text.Json.Serialization;

namespace DBViewR.Model
{
    public class RelationSchema
    {
        [JsonPropertyName("From")]
        public TableSchema From { get; set; }

        [JsonPropertyName("To")]
        public TableSchema To { get; set; }
    }
}
