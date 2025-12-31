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
          placeholder="e.g. John Doe"
          value={name}
          onChange={(e) => setName(e.target.value.replace(/[^A-Za-z ]/g, ""))}
          required
        />

        {/* EMAIL – normal */}
        <TextInput
          name="popup_email"
          label="Email"
          placeholder="e.g. john.doe@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextInput
          name="popup_phone"
          label="Phone"
          placeholder="e.g. 9876543210"
          value={phone}
          maxLength={14}
          inputMode="numeric"
          onChange={(e) =>
            setPhone(e.currentTarget.value.replace(/\D/g, "").slice(0, 14))
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
