package com.teddybear.videoservice.serializer;

import com.teddybear.videoservice.vo.ResponseNote;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class ResponseNoteSerializer extends StdSerializer<ResponseNote> {
    public ResponseNoteSerializer() {
        this(null);
    }

    public ResponseNoteSerializer(Class<ResponseNote> t) {
        super(t);
    }

    @Override
    public void serialize(
            ResponseNote value,
            JsonGenerator gen,
            SerializerProvider provider
    ) throws IOException {
        gen.writeStartObject();
        gen.writeNumberField("id", value.getId());
        gen.writeStringField("note", value.getNote());
        // LocalDateTime을 문자열로 직렬화
        gen.writeStringField("noteDate", value.getNoteDate().toString());

        // VideoEntity 객체의 videoId와 videoTitle을 직렬화
        if (value.getVideoId() != null) {
            gen.writeNumberField("videoId", value.getVideoId());
        }
        if (value.getVideoTitle() != null) {
            gen.writeStringField("videoTitle", value.getVideoTitle());
        }

        gen.writeEndObject();
    }
}
