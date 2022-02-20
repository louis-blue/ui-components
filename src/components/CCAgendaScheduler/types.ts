import React from "react";

export interface CCAgendaSchedulerEvent {
  date: Date;
  event: { [key: string]: any };
}

export interface CCAgendaSchedulerComponent {
  agenda?: {
    header?: React.FC<React.PropsWithChildren<CCAgendaSchedulerEvent>>;
    event?: React.FC<React.PropsWithChildren<CCAgendaSchedulerEvent>>;
  };
}

export interface CCAgendaSchedulerProps {
  date: {
    begin: Date;
    end: Date;
  };
  contents: Array<CCAgendaSchedulerEvent>;
  onClick: (e: CCAgendaSchedulerEvent) => void;
  component?: CCAgendaSchedulerComponent;
}
