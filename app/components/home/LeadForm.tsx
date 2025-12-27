import { Stack, TextInput, Button } from "@mantine/core";
import React, { useState } from "react";

export default function LeadForm({ fetcher, isSubmitting }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <fetcher.Form method="post">
      <Stack>
        {/* NAME – alphabets only */}
        <TextInput
          name="popup_name"
          label="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value.replace(/[^A-Za-z ]/g, ""))
          }
          required
        />

        {/* EMAIL – normal */}
        <TextInput
          name="popup_email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PHONE – numbers only */}
        <TextInput
          name="popup_phone"
          label="Phone"
          value={phone}
          maxLength={14}
          inputMode="numeric"
          onChange={(e) =>
            setPhone(e.target.value.replace(/\D/g, ""))
          }
          required
        />

        <Button type="submit" loading={isSubmitting}>
          Submit
        </Button>
      </Stack>
    </fetcher.Form>
  );
}



