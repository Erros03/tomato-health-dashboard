import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonProgressBar,
  IonRow,
} from "@ionic/react";
import { AppShell } from "@/components/AppShell";
import { useBlightStream } from "@/lib/useBlightStream";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BlightDetect+ | Tomato Blight Detection & Yield Dashboard" },
      {
        name: "description",
        content:
          "Live AI and IoT dashboard for tomato blight detection, classification, automated sorting and yield monitoring powered by YOLO vision and Arduino hardware.",
      },
      { property: "og:title", content: "BlightDetect+ Yield Monitoring Dashboard" },
      {
        property: "og:description",
        content:
          "Track processed tomatoes, healthy yield, blight rejections and classification accuracy in real time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <ClientOnly fallback={null}>
      <DashboardView />
    </ClientOnly>
  );
}

function DashboardView() {
  const { events, metrics } = useBlightStream();

  return (
    <AppShell title="Yield Monitoring Dashboard">
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeMd="4">
            <IonCard className="bd-metric-card">
              <IonCardHeader>
                <IonCardSubtitle className="bd-metric-label">
                  Total Tomatoes Processed
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="bd-metric-value bd-accent-gray">{metrics.total}</div>
                <IonNote>Since session start</IonNote>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="4">
            <IonCard className="bd-metric-card">
              <IonCardHeader>
                <IonCardSubtitle className="bd-metric-label">Healthy Yield</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="bd-metric-value bd-accent-leaf">{metrics.healthy}</div>
                <IonNote>{metrics.healthyPct}% accepted by sorter</IonNote>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="4">
            <IonCard className="bd-metric-card">
              <IonCardHeader>
                <IonCardSubtitle className="bd-metric-label">
                  Blight Detected (Rejected)
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="bd-metric-value bd-accent-tomato">{metrics.blighted}</div>
                <IonNote>{metrics.blightPct}% diverted by servo gate</IonNote>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="12" sizeLg="5">
            <IonCard className="bd-metric-card">
              <IonCardHeader>
                <IonCardTitle style={{ fontSize: "1.1rem" }}>
                  Classification Breakdown
                </IonCardTitle>
                <IonCardSubtitle>YOLO model average confidence {metrics.avgConfidence}%</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="bd-metric-label">Healthy — {metrics.healthyPct}%</div>
                <IonProgressBar color="success" value={metrics.healthyPct / 100} />
                <div className="bd-metric-label" style={{ marginTop: 16 }}>
                  Infected — {metrics.blightPct}%
                </div>
                <IonProgressBar color="danger" value={metrics.blightPct / 100} />
                <div className="bd-metric-label" style={{ marginTop: 16 }}>
                  Model confidence — {metrics.avgConfidence}%
                </div>
                <IonProgressBar color="warning" value={metrics.avgConfidence / 100} />
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeLg="7">
            <IonCard className="bd-metric-card">
              <IonList>
                <IonListHeader>
                  <IonLabel>Live Sorting Feed</IonLabel>
                  <IonBadge color="success">streaming</IonBadge>
                </IonListHeader>
                {events.slice(0, 12).map((e) => (
                  <IonItem key={e.id} lines="full">
                    <IonLabel>
                      <h3 className="bd-accent-gray">
                        ID #{e.id} — {e.label}
                      </h3>
                      <p>
                        {e.action} · {e.confidence}% confidence · {e.time}
                      </p>
                    </IonLabel>
                    <IonBadge slot="end" color={e.action === "Accepted" ? "success" : "danger"}>
                      {e.action}
                    </IonBadge>
                  </IonItem>
                ))}
              </IonList>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </AppShell>
  );
}
